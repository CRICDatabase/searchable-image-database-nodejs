"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const Criptografia = require("../../utils/criptografia");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req.body);
        const statusAtivo = 1;
        const senhaCriptografada = Criptografia.criarCriptografiaMd5Utf8(req.body.senha);
        const usuarioCriado = await UsuarioRepositorio.cadastrarUsuarioBase(req.body, senhaCriptografada, statusAtivo);
        let id_usuario = usuarioCriado.dataValues.id;
        const visitanteCriado = await UsuarioRepositorio.cadastrarVisitante(id_usuario, req.body);
        return prepararRetorno(usuarioCriado, visitanteCriado);
    }
};


async function validarRequisicao(usuarioReq) {

    if (!usuarioReq.primeiro_nome || !usuarioReq.email || !usuarioReq.senha || !usuarioReq.pais ||
        !usuarioReq.estado_regiao || !usuarioReq.cidade) {

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

function prepararRetorno(usuarioCriado, visitanteCriado) {

    if (!visitanteCriado) {
        ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
        ObjetoExcecao.title = Excecao.ERRO_INTERNO;
        throw ObjetoExcecao;
    }

    const visitante = {
        id: usuarioCriado.dataValues.id,
        primeiro_nome: usuarioCriado.dataValues.primeiro_nome,
        ultimo_nome: usuarioCriado.dataValues.ultimo_nome,
        email: usuarioCriado.dataValues.email,
        senha: usuarioCriado.dataValues.senha,
        ativo: usuarioCriado.dataValues.ativo,
        cidade: visitanteCriado.dataValues.cidade,
        pais: visitanteCriado.dataValues.pais,
        estado_regiao: visitanteCriado.dataValues.estado_regiao,
        createdAt: visitanteCriado.dataValues.updatedAt,
        updatedAt: visitanteCriado.dataValues.createdAt
    };
    return visitante;
}