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
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    not_implemented(req, res) {
        return res.status(HttpStatus.NOT_IMPLEMENTED).end();
    }
};
