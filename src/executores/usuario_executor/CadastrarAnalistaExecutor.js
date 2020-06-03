"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req.params);
        const analistaCadastrado = await UsuarioRepositorio.cadastrarAnalista(req.params.id_usuario);

        if(analistaCadastrado) {
            return analistaCadastrado;
        }
        else {
            ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.title = Excecao.ERRO_INTERNO;
            ObjetoExcecao.detail = "Failed to create a analyst";
            throw ObjetoExcecao;
        }        
    }
};

async function validarRequisicao(usuario) {

    if(!ValidarTipo.ehNumero(usuario.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterUsuarioBasePorId(usuario.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if(await UsuarioRepositorio.obterAnalistaPorId(usuario.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.CONFLICT;
        ObjetoExcecao.title = Excecao.ANALISTA_EXISTENTE;
        throw ObjetoExcecao;
    }    
}
