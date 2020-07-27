"use strict";

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
