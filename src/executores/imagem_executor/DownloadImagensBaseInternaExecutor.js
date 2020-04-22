"use strict";

const HttpStatus = require("http-status-codes");
const JSZip = require("jszip");
const fs = require("fs");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        console.log("begin");
        const CSV_CLASSIFICATION_FILENAME = "classifications.csv";
        const JSON_CLASSIFICATION_FILENAME = "classifications.json";

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);

        const all_images = await ImagemRepositorio.listarImagensValidasNoSistema();
        /* TODO process image from user
        const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario);
        const [todasImagens, visitante] = await Promise.all([todasImagensTask, visitanteTask]);
        */

        var classification_array = [];
        var classification_csv_string = "image_id,image_filename,image_doi,cell_id,characteristics,nucleus_x,nucleus_y\n";
        var zip = new JSZip();
        for await (let image of all_images){
            try {
                zip.file(
                    image.nome,
                    fs.readFileSync(
                        `${__dirname}/../../assets/${image.caminho_imagem}${image.nome}`
                    )
                );
            }
            catch(err) {
                console.log(`Fail to add ${image.nome} due ${err}`);
            }

            /* Query for classifications */
            let classifications = await ImagemRepositorio.listarClassificacoesCelula(
                image.id,
                req.params.id_usuario ? req.params.id_usuario : 1
            );

            classification_array.push({
                "image_id": image.id,
                "image_doi": "",
                "image_name": image.nome,
                "classifications": classifications.map(
                    (item) => {
                        return {
                            "cell_id": item.id_celula,
                            "characterisitics": item.id_classificacao,
                            "nucleus_x": item.coord_centro_nucleo_x,
                            "nucleus_y": item.coord_centro_nucleo_y
                        };
                    }
                )
            });

            classifications.forEach(
                (item, index, array) => {
                    classification_csv_string = classification_csv_string + `${image.id},${image.nome},,${item.id_celula},${item.id_classificacao},${item.coord_centro_nucleo_x},${item.coord_centro_nucleo_y}\n`;
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
            console.log(`Fail to add ${JSON_CLASSIFICATION_FILENAME} due ${err}`);
        }

        try {
            zip.file(
                CSV_CLASSIFICATION_FILENAME,
                classification_csv_string
            );
        }
        catch(err) {
            console.log(`Fail to add ${CSV_CLASSIFICATION_FILANAME} due ${err}`);
        }

        return zip
            .generateNodeStream({type:'nodebuffer',streamFiles:true});
    }
};

async function validarRequisicao(req) {

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
