"use strict";

const ValidadorDeSessao = require("../../utils/validador_de_sessao");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req, res) {
        await ValidadorDeSessao.admin_required(req);
        return await UsuarioRepositorio.ListarTodosUsuarios();
    }
};
