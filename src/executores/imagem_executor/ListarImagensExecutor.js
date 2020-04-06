'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const FonteAquisicao = require('../../utils/enumeracoes/fonte_aquisicao');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);

        const todasImagensTask = ImagemRepositorio.listarImagensValidasNoSistema();
        const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario);
        const [todasImagens, visitante] = await Promise.all([todasImagensTask, visitanteTask]);

        if(todasImagens.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }

        const resutado = await prepararRetorno(todasImagens, visitante);
        return resutado;
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario)) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    if (!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }
}

async function prepararRetorno(listaImagens, visitante) {

    let resultado;
    if(visitante) {
        const listaFiltrada = filtrarImagensParaVisitante(listaImagens, visitante.dataValues.id);
        resultado =  await obterObjetoDeRetorno(listaFiltrada);       
    }
    else {
        resultado = await obterObjetoDeRetorno(listaImagens);
    }

    return resultado;
}

function filtrarImagensParaVisitante(todasImagens, id_visitante) {

    //falta revisar
    let contadorImagens = 0;
    let imagensCadastradasPeloVisitante = [];

    for(let i = 0; i < todasImagens.length && contadorImagens < 6; i++) {

        if(todasImagens[i].dataValues.fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA) {
            imagensCadastradasPeloVisitante.push(todasImagens[i]);
            contadorImagens++;
        }
    }

    todasImagens.forEach(imagem => {
        if(imagem.dataValues.id_usuario == id_visitante) {
            imagensCadastradasPeloVisitante.push(imagem);
        }
    });

    return imagensCadastradasPeloVisitante;
}

async function obterObjetoDeRetorno(listaImagens) {

    let resultado = [];
    for(let i = 0;  i < listaImagens.length; i++) {

        const lesao = await ImagemRepositorio.obterLesaoPorId(listaImagens[i].dataValues.id_lesao);
        const totalClassificacoes = await ImagemRepositorio.obterTotalClassificacoesImagem(listaImagens[i].dataValues.id);
        const totalSegmentacoes = await ImagemRepositorio.obterTotalSegmentacoesImagem(listaImagens[i].dataValues.id);;

        resultado.push({
            id: listaImagens[i].dataValues.id,
            nome: listaImagens[i].dataValues.nome,
            codigo_lamina: listaImagens[i].dataValues.codigo_lamina,
            excluida: listaImagens[i].dataValues.excluida,
            classificacao_aprovada: listaImagens[i].dataValues.classificacao_aprovada,
            dt_aquisicao: listaImagens[i].dataValues.dt_aquisicao,
            fonte_aquisicao: listaImagens[i].dataValues.fonte_aquisicao,
            caminho_imagem: listaImagens[i].dataValues.caminho_imagem,
            altura: listaImagens[i].dataValues.altura,
            largura: listaImagens[i].dataValues.largura,
            createdAt: listaImagens[i].dataValues.createdAt,
            updatedAt: listaImagens[i].dataValues.updatedAt,
            id_usuario: listaImagens[i].dataValues.id_usuario,
            lesao: lesao,
            total_segmentacoes: totalSegmentacoes,
            total_classificacoes: totalClassificacoes
        });
    }

    return resultado;
}