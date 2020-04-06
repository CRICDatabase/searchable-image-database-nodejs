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
        validarRequisicao(req);
        const visitante = await UsuarioRepositorio.obterVisitanteCompleto(req.params.id_usuario);

        if (visitante.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.VISITANTE_NAO_ENCONTRADO;
            throw ObjetoExcecao;
        }
        return visitante[0];
    }
};

function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}