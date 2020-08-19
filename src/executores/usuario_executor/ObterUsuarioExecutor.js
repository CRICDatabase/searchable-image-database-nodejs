"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ObterUsuarioExecutor");

const HttpStatus = require("http-status-codes");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {
        const id_usuario = Number(req.params.id_usuario);
        
        const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(
            id_usuario
        );

        if (!usuario) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
            ObjetoExcecao.detail = "Failed to create a executer user";
            throw ObjetoExcecao;
        }

        return usuario.dataValues;
    }
};
