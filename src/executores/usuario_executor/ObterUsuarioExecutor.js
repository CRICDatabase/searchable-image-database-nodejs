'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const GeradorIdUnico = require('../../utils/gerador_identificador_unico');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const Criptografia = require('../../utils/criptografia');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const SessaoRepositorio = require('../../repositorios/sessao_repositorio');

module.exports = {

    async Executar(req) {

        validarRequisicao(req);
        const senhaCriptografada = Criptografia.criarCriptografiaMd5Utf8(req.body.senha);
        const usuarioBase = await UsuarioRepositorio.obterUsuarioBasePorEmail(req.body.email);
        let usuario = await UsuarioRepositorio.obterUsuarioCompletoPorIdOuLogin(req.params.id_usuario, req.body.email, senhaCriptografada);
        
        if (!usuario) {
            ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
            ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
            throw ObjetoExcecao;
        }

        usuario.id = usuarioBase.dataValues.id;
        if (req.params.id_usuario == 0) {
            validarLogin(req.body.email, senhaCriptografada, usuario);
            return await obterRetorno(usuario, req.headers.token_autenticacao);
        }

        const resultado = await UsuarioRepositorio.obterUsuarioBasePorEmail(usuario.email);
        usuario.id = resultado.dataValues.id;
        return usuario;        
    }
};

function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    if (!(req.body.email && req.body.senha)) {
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}

function validarLogin(email, senhaCriptografada, usuarioBanco) {

    if (!(email == usuarioBanco.email) || !(senhaCriptografada == usuarioBanco.senha)) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.NENHUM_USUARIO_ENCONTRATO;
        throw ObjetoExcecao;
    }
}

async function obterRetorno(usuario, token_curinga_login) {

    const tokenCuringa = GeradorIdUnico.obterTokenCuringa();
    if (tokenCuringa == token_curinga_login) {

        let token_autenticacao = GeradorIdUnico.gerarUuidv4();
        const sessaoCriada = await SessaoRepositorio.criarRegistroDeSessao(usuario.email, token_autenticacao);

        if (sessaoCriada) {
            const retorno = {
                usuario: usuario,
                token_autenticacao: token_autenticacao
            };
            return retorno;
        }
    }

    ObjetoExcecao.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
    ObjetoExcecao.mensagem = Excecao.ERRO_INTERNO;
    throw ObjetoExcecao;
}