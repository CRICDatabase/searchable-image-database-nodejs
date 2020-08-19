"use strict";

const SessaoRepositorio = require("../../repositorios/sessao_repositorio");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);
        
        await SessaoRepositorio.anularRegistroDeSessao(
            req.get("Authorization")
        );
    }
};

async function validarRequisicao(req){
}
