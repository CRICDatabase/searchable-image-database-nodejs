'use strict'

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        const citopatologistaCadastrado = await UsuarioRepositorio.transformarUsuarioEmCitopatologista(req.params.id_usuario, req.body.codigo_crc);

        if(citopatologistaCadastrado) {
            return citopatologistaCadastrado;
        }
        else {
            ObjetoExcecao.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.mensagem = Excecao.ERRO_INTERNO;
            throw ObjetoExcecao;
        }
    }
}

async function validarRequisicao(req) {

    if(!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_usuario_adm) || !req.body.codigo_crc) {
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario_adm)) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.ADMINISTRADOR_NAO_ENCONTRADO;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterAdministradorPorId(req.params.id_usuario_adm)){
        ObjetoExcecao.status_code = HttpStatus.UNAUTHORIZED;
        ObjetoExcecao.mensagem = Excecao.USUARIO_NAO_AUTORIZADO;
        throw ObjetoExcecao;
    }

    if(await UsuarioRepositorio.obterCitopatologistaPorId(req.params.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.CONFLICT;
        ObjetoExcecao.mensagem = Excecao.CITOPATOLOGISTA_EXISTENTE;
        throw ObjetoExcecao;
    }

    if(await UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.FORBIDDEN;
        ObjetoExcecao.mensagem = Excecao.ACAO_PROIBIDA_PARA_VISITANTE;
        throw ObjetoExcecao;
    }
}