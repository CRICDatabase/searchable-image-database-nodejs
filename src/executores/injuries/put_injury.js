"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:approve_image");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

module.exports = {

    async Executar(req, res) {
        await validarRequisicao(req, res);
        return await ImagemRepositorio.update_injury(
            {
                id: req.params.id_lesao,
                ...req.body
            }
        );
            );
    }
};

async function validarRequisicao(req, res) {

    if (!req.body.nome || typeof req.body.nome !== "string" ||
        !req.body.detalhes || typeof req.body.detalhes !== "string" ||
        !req.body.grade || !validator.isInt(req.body.grade)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Body request is invalid";
        throw ObjetoExcecao;
    }

    const injury_task = ImagemRepositorio.obterLesaoPorId(req.params.id_imagem);
    const [injury] = await Promise.all([injury_task]);

    if (!injury) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        throw ObjetoExcecao;
    }
}
