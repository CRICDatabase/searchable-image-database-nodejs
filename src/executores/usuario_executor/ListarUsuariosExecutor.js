"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const ValidarTipo = require("../../utils/validacao_de_tipos");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {
        await ValidadorDeSessao.login_required(req);
        validate_request(req);

        let todosUsuarios;
        if(req.params.id_usuario){
            todosUsuarios = await UsuarioRepositorio.obterUsuarioCompletoPorIdOuLogin(req.params.id_usuario);
        }
        else{
            todosUsuarios = await UsuarioRepositorio.ListarTodosUsuarios();
        }

        if(todosUsuarios.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.NENHUM_USUARIO_ENCONTRATO;
            throw ObjetoExcecao;
        }

        return todosUsuarios;
    }
};

function validate_request(req) {
    if(req.params.id_usuario && !ValidarTipo.ehNumero(req.params.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}
