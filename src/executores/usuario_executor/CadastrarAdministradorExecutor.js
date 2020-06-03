"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const Criptografia = require("../../utils/criptografia");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req.body);
        const statusAtivo = 1;
        const senhaCriptografada = Criptografia.criarCriptografiaMd5Utf8(req.body.senha);
        const usuarioCriado = await UsuarioRepositorio.cadastrarUsuarioBase(req.body, senhaCriptografada, statusAtivo);
        let id_usuario = usuarioCriado.dataValues.id;
        const adminCriado = await UsuarioRepositorio.cadastrarAdministrador(id_usuario, req.body);
        return prepararRetorno(usuarioCriado, adminCriado);
    }
};

async function validarRequisicao(usuarioReq) {

    if (!usuarioReq.primeiro_nome || !usuarioReq.email || !usuarioReq.senha) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    let registroExistente = await UsuarioRepositorio.verificarEmailExistente(usuarioReq.email);

    if (registroExistente) {

        ObjetoExcecao.status = HttpStatus.CONFLICT;
        ObjetoExcecao.title = Excecao.CONFLITO_DE_REGISTROS;
        throw ObjetoExcecao;
    }
}

function prepararRetorno(usuarioCriado, adminCriado) {

    if (!adminCriado) {
        ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
        ObjetoExcecao.title = Excecao.ERRO_INTERNO;
        ObjetoExcecao.detail = "Failed to create a executer admin";
        throw ObjetoExcecao;
    }

    const administrador = {
        id: usuarioCriado.dataValues.id,
        primeiro_nome: usuarioCriado.dataValues.primeiro_nome,
        ultimo_nome: usuarioCriado.dataValues.ultimo_nome,
        email: usuarioCriado.dataValues.email,
        senha: usuarioCriado.dataValues.senha,
        ativo: usuarioCriado.dataValues.ativo,
        createdAt: adminCriado.dataValues.updatedAt,
        updatedAt: adminCriado.dataValues.createdAt
    };
    return administrador;
}

