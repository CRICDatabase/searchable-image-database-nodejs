'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');

const ListarDescricoes = require('../imagem_executor/ListarDescricoesExecutor');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        const total = req.body.length;

        for (let i = 0; i < total; i++) {
            await ImagemRepositorio.cadastrarDescricao(req.body[i]);
        }

        return await ListarDescricoes.Executar(req);
    }
};

async function validarRequisicao(req) {
    let descricoes = req.body;

    if(!ValidarTipo.ehNumero(req.params.id_usuario) || descricoes.length == 0) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    descricoes.forEach(descricao => {

        if(!ValidarTipo.ehNumero(descricao.codigo)) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            throw ObjetoExcecao;
        }
    });

    const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);    
    if(!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    const administradorTask = UsuarioRepositorio.obterAdministradorPorId(req.params.id_usuario);
    const citopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(req.params.id_usuario);
    const [administrador, citopatologista] = await Promise.all([administradorTask, citopatologistaTask]);

    if(!(administrador || citopatologista)) {
        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        ObjetoExcecao.title = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
        throw ObjetoExcecao;
    }
}