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

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        
        const all_images = await ImagemRepositorio.listarImagensValidasNoSistema();
        /* TODO process image from user
        const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario);
        const [todasImagens, visitante] = await Promise.all([todasImagensTask, visitanteTask]);
        */

        var zip = new JSZip();
        for await (let image of all_images){
            try {
                zip.file(image.nome, fs.readFileSync(image.caminho_imagem));
            }
            catch(err) {
                console.log(`Fail to add ${image.nome} due ${err}`);
            }
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
