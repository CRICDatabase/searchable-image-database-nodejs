"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:approve_image");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

module.exports = {

    async Executar(req, res) {
        return await ImagemRepositorio.obterLesaoPorId(req.params.id_lesao);
    }
};
