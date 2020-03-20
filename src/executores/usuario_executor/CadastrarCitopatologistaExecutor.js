'use strict'

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const Criptografia = require('../../utils/criptografia');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');

module.exports = {

    async Executar(req) {

        //await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req.body);
        const statusAtivo = 1;
        const senhaCriptografada = Criptografia.criarCriptografiaMd5Utf8(req.body.senha);
        const usuarioCriado = await UsuarioRepositorio.cadastrarUsuarioBase(req.body, senhaCriptografada, statusAtivo);
        let id_usuario = usuarioCriado.dataValues.id;
        const citopatologistaCriado = await UsuarioRepositorio.cadastrarCitopatologista(id_usuario, req.body);
        return prepararRetorno(usuarioCriado, citopatologistaCriado);
    }
};

async function validarRequisicao(usuarioReq) {

    if (!usuarioReq.primeiro_nome || !usuarioReq.email || !usuarioReq.senha || !usuarioReq.codigo_crc) {

        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    let registroExistente = await UsuarioRepositorio.verificarEmailExistente(usuarioReq.email);;

    if (registroExistente) {
        ObjetoExcecao.status_code = HttpStatus.CONFLICT;
        ObjetoExcecao.mensagem = Excecao.CONFLITO_DE_REGISTROS;
        throw ObjetoExcecao;
    }
}

function prepararRetorno(usuarioCriado, citopatologistaCriado) {

    if (!citopatologistaCriado) {
        ObjetoExcecao.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
        ObjetoExcecao.mensagem = Excecao.ERRO_INTERNO;
        throw ObjetoExcecao;
    }

    const citopatologista = {
        id: usuarioCriado.dataValues.id,
        primeiro_nome: usuarioCriado.dataValues.primeiro_nome,
        ultimo_nome: usuarioCriado.dataValues.ultimo_nome,
        email: usuarioCriado.dataValues.email,
        senha: usuarioCriado.dataValues.senha,
        ativo: usuarioCriado.dataValues.ativo,
        codigo_crc: citopatologistaCriado.dataValues.codigo_crc,
        createdAt: citopatologistaCriado.dataValues.updatedAt,
        updatedAt: citopatologistaCriado.dataValues.createdAt
    }
    return citopatologista;
}