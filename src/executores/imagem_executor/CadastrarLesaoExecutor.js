'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const ListarLesoes = require('../imagem_executor/ListarLesoesExecutor');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        const total = req.body.length;
        for (let i = 0; i < total; i++) {
            await ImagemRepositorio.cadastrarLesao(req.body[i]);
        }

        return await ListarLesoes.Executar(req);        
    }
};

async function validarRequisicao(req) {

    let lesoes = req.body;

    if(!ValidarTipo.ehNumero(req.params.id_usuario) || lesoes.length == 0) {
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    lesoes.forEach(lesao => {

        if(!lesao.nome) {
            ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
            throw ObjetoExcecao;
        }

    });

    const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    if(!usuario) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }
  
    const administradorTask = UsuarioRepositorio.obterAdministradorPorId(req.params.id_usuario);
    const citopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(req.params.id_usuario);
    const [administrador, citopatologista] = await Promise.all([administradorTask, citopatologistaTask]);

    if(!(administrador || citopatologista)) {
        ObjetoExcecao.status_code = HttpStatus.FORBIDDEN;
        ObjetoExcecao.mensagem = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
        throw ObjetoExcecao;
    }
}