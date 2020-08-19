"use strict";

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req, res) {
        return await UsuarioRepositorio.ListarTodosUsuarios();
    }
};
