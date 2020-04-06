'use strict';

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
            ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.title = Excecao.ERRO_INTERNO;
            throw ObjetoExcecao;
        }
    }
};

async function validarRequisicao(req) {

    if(!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_usuario_adm) || !req.body.codigo_crc) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario_adm)) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.ADMINISTRADOR_NAO_ENCONTRADO;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterAdministradorPorId(req.params.id_usuario_adm)){
        ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
        ObjetoExcecao.title = Excecao.USUARIO_NAO_AUTORIZADO;
        throw ObjetoExcecao;
    }

    if(await UsuarioRepositorio.obterCitopatologistaPorId(req.params.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.CONFLICT;
        ObjetoExcecao.title = Excecao.CITOPATOLOGISTA_EXISTENTE;
        throw ObjetoExcecao;
    }

    if(await UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario)) {
        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        ObjetoExcecao.title = Excecao.ACAO_PROIBIDA_PARA_VISITANTE;
        throw ObjetoExcecao;
    }
}