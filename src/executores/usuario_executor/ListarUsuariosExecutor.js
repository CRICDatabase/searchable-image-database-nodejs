"use strict";

const HttpStatus = require("http-status-codes");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {
        if (res.locals.user.admin === true) {
            return await UsuarioRepositorio.ListarTodosUsuarios();
        }

        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        throw ObjetoExcecao;
    }
};
