"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ImagemController");

const HttpStatus = require("http-status-codes");

const get_injury_service = require("../executores/injuries/get_injury");
const put_injury_service = require("../executores/injuries/put_injury");

module.exports = {

    async get_injury(req, res, next) {

        try {
            const injury = await get_injury_service.Executar(req, res);
            return res.status(HttpStatus.OK).json(injury);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async put_injury(req, res, next) {

        try {
            await put_injury_service.Executar(req, res);
            return res.status(HttpStatus.OK).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    }


};
