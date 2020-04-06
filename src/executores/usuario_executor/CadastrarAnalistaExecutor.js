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
        await validarRequisicao(req.params);
        const analistaCadastrado = await UsuarioRepositorio.cadastrarAnalista(req.params.id_usuario);

        if(analistaCadastrado) {
            return analistaCadastrado;
        }
        else {
            ObjetoExcecao.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.mensagem = Excecao.ERRO_INTERNO;
            throw ObjetoExcecao;
        }        
    }
};

async function validarRequisicao(usuario) {

    if(!ValidarTipo.ehNumero(usuario.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    if(!await UsuarioRepositorio.obterUsuarioBasePorId(usuario.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if(await UsuarioRepositorio.obterAnalistaPorId(usuario.id_usuario)) {
        ObjetoExcecao.status_code = HttpStatus.CONFLICT;
        ObjetoExcecao.mensagem = Excecao.ANALISTA_EXISTENTE;
        throw ObjetoExcecao;
    }    

    const CitopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(usuario.id_usuario);
    const VisitanteTask = UsuarioRepositorio.obterVisitantePorId(usuario.id_usuario);
    const [Citopatologista, Visitante] = await Promise.all([CitopatologistaTask, VisitanteTask]);

    if(!Citopatologista && !Visitante) {
        ObjetoExcecao.status_code = HttpStatus.FORBIDDEN;
        ObjetoExcecao.mensagem = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
        throw ObjetoExcecao;
    }
}