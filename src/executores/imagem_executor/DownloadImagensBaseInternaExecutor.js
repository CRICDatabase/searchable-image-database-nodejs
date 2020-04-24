"use strict";

const HttpStatus = require("http-status-codes");
const JSZip = require("jszip");
const debug = require("debug")("database.cric:DownloadExecutor");
const fs = require("fs");
const path = require("path");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);

        const CSV_CLASSIFICATION_FILENAME = "classifications.csv";
        const JSON_CLASSIFICATION_FILENAME = "classifications.json";
        const README_FILENAME = "README.classification.md";
        const path2assets = path.normalize(
            path.join(
                __dirname,
                "..",
                "..",
                "assets"
            )
        );

        var zip = new JSZip();
        
        try {
            zip.file(
                "README.md",
                fs.readFileSync(
                    path.resolve(
                        path2assets,
                        "download",
                        README_FILENAME
                    )
                )
            );
        }
        catch(err) {
            debug(`Fail to add ${README_FILENAME} due ${err}`);
        }

        const all_images = await ImagemRepositorio.listarImagensValidasNoSistema();
        /* TODO process image from user
        const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario);
        const [todasImagens, visitante] = await Promise.all([todasImagensTask, visitanteTask]);
        */

        var classification_array = [];
        var classification_csv_string = "image_id,image_filename,image_doi,cell_id,bethesda_system,nucleus_x,nucleus_y\n";
        
        for await (let image of all_images){
            try {
                zip.file(
                    image.nome,
                    fs.readFileSync(
                        path.resolve(
                            path2assets,
                            image.caminho_imagem,
                            image.nome
                        )
                    )
                );
            }
            catch(err) {
                debug(`Fail to add ${image.nome} due ${err}`);
            }

            /* Query for classifications */
            let classifications = await ImagemRepositorio.listarClassificacoesCelula(
                image.id,
                req.params.id_usuario ? req.params.id_usuario : 1
            );

            classification_array.push({
                image_id: image.id,
                image_doi: "",
                image_name: image.nome,
                classifications: classifications.map(
                    (item) => {
                        return {
                            cell_id: item.id_celula,
                            bethesda_system: lesionID2lesionName(item.id_lesao),
                            nucleus_x: item.coord_centro_nucleo_x,
                            nucleus_y: item.coord_centro_nucleo_y
                        };
                    }
                )
            });

            classifications.forEach(
                (item) => {
                    classification_csv_string = classification_csv_string + `${image.id},${image.nome},,${item.id_celula},${lesionID2lesionName(item.id_lesao)},${item.coord_centro_nucleo_x},${item.coord_centro_nucleo_y}\n`;
                }
            );

            /* TODO Query for segmentation */
        }

        try {
            zip.file(
                JSON_CLASSIFICATION_FILENAME,
                JSON.stringify(classification_array)
            );
        }
        catch(err) {
            debug(`Fail to add ${JSON_CLASSIFICATION_FILENAME} due ${err}`);
        }

        try {
            zip.file(
                CSV_CLASSIFICATION_FILENAME,
                classification_csv_string
            );
        }
        catch(err) {
            debug(`Fail to add ${CSV_CLASSIFICATION_FILENAME} due ${err}`);
        }

        return zip
            .generateNodeStream({type:"nodebuffer", streamFiles:true});
    }
};

async function validarRequisicao(req) {

    if(req.params.id_usuario){
        if (!ValidarTipo.ehNumero(req.params.id_usuario)) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            throw ObjetoExcecao;
        }

        const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
        if (!usuario) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
            throw ObjetoExcecao;
        }
    }
}

function lesionID2lesionName(lession_id) {
    var lesion_name;
    switch(lession_id) {
        case 1:
            lesion_name = "Negative for intraepithelial lesion";
            break;
        case 2:
            lesion_name = "ASC-US";
            break;
        case 3:
            lesion_name = "LSIL";
            break;
        case 4:
            lesion_name = "ASC-H";
            break;
        case 5:
            lesion_name = "HSIL";
            break;
        case 6:
            lesion_name = "SCC";
            break;
    }
    return lesion_name;
}