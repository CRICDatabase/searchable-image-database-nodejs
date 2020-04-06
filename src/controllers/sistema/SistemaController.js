"use strict";

const HttpStatus = require("http-status-codes");
const ObterStatusSistemaExecutor = require("../../executores/sistema/ObterStatusSistemaExecutor");

module.exports = {

    consultarStatusDoSistema(req, res) {

        let status;
        try{
            status = ObterStatusSistemaExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(status);
        }
        catch(erro) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    }
};