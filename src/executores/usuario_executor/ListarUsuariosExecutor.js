"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        const todosUsuarios = await UsuarioRepositorio.ListarTodosUsuarios();        
        if(todosUsuarios.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.NENHUM_USUARIO_ENCONTRATO;
            throw ObjetoExcecao;
        }

        return todosUsuarios;
    }
};