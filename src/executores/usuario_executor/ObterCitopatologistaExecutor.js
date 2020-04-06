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
        let citopatologista = await UsuarioRepositorio.obterCitopatologistaCompleto(req.params.id_usuario);

        if(citopatologista.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.CITOPATOLOGISTA_NAO_ENCONTRADO;
            throw ObjetoExcecao;
        }

        return citopatologista[0];
    }
};

function validarRequisicao(req) {

    if(!ValidarTipo.ehNumero(req.params.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}