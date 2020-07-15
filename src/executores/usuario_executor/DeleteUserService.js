"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:DeleteUserService");

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        const id_usuario = Number(req.params.id_usuario);

        if (isNaN(id_usuario)) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            ObjetoExcecao.detail = "id_usuario must be an integer";
            throw ObjetoExcecao;
        }

        const user = await UsuarioRepositorio.obterUsuarioBasePorId(id_usuario);

        if (user) {
            await ValidadorDeSessao.login_required(
                req,
                user.dataValues.id
            );

            await UsuarioRepositorio.delete_user(
                user.dataValues.id
            );
        }

        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = `User with id ${id_usuario} not found`;
        throw ObjetoExcecao;
    }
};
