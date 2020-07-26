"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const SessaoRepositorio = require("../../repositorios/sessao_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);
        
        await SessaoRepositorio.anularRegistroDeSessao(
            req.get("Authorization")
        );
    }
};

async function validarRequisicao(req){
    await ValidadorDeSessao.login_required(req);
}
