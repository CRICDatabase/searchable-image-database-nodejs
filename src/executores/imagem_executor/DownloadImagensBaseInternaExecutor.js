'use strict'

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        
        var sistemaWindows = process.platform === "win32";
        let barra = '/';
        if(sistemaWindows) { barra = '\\'; }

        const nomeArquivo = 'base_interna.zip';
        const diretorioArquivo = `src${barra}assets${barra}imagens${barra}base_interna_zip${barra}`;
        const caminho_base_diretorio = __dirname + `${barra}..${barra}..${barra}..${barra}`;

        const resutado = {
            caminho: caminho_base_diretorio + diretorioArquivo + nomeArquivo,
            nomeArquivo: nomeArquivo
        }

        return resutado;
    }
}

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario)) {

        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    if (!usuario) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }
}