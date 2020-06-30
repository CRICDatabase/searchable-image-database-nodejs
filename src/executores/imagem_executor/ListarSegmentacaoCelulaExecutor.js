"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);
        const id_usuario = parseInt(req.params.id_usuario);
        const id_imagem = parseInt(req.params.id_imagem);


        const todasSegmentacoesCitoplasmaTask = ImagemRepositorio.listarSegmentosCitoplasmaCelula(id_imagem, id_usuario);
        const todasSegmentacoesNucleoTask = ImagemRepositorio.listarTodosSegmentosNucleoCelula(id_imagem, id_usuario);
        const [todasSegmentacoesCitoplasma, todasSegmentacoesNucleo] =
            await Promise.all([todasSegmentacoesCitoplasmaTask, todasSegmentacoesNucleoTask]);

        if (todasSegmentacoesCitoplasma.length == 0) {

            let resultado = {
                id_imagem: req.params.id_imagem,
                celulas: []
            };

            return resultado;
        }

        let resultado = {
            id_imagem: req.params.id_imagem,
            celulas: await prepararRetornoSegmentacao(req, todasSegmentacoesCitoplasma, todasSegmentacoesNucleo)
        };

        return resultado;
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem)) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [usuario, imagem] = await Promise.all([usuarioTask, imagemTask]);

    if (!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if (imagem.id_usuario > 1) {
        if (imagem.id_usuario !== usuario.id) {
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
            ObjetoExcecao.detail = `User ${usuario.id} can't change image ${imagem.id}`;
            throw ObjetoExcecao;
        }

        await ValidadorDeSessao.login_required(req, usuario.id);
    }
}

async function prepararRetornoSegmentacao(req, segmentacaoCitoplasma, segmentacaoNucleo) {

    let celulasSegmentadas = [];
    let todasCelulas = listarCelulas(segmentacaoCitoplasma);
    let totalCelulas = todasCelulas.length;
    let id_celula = 0;
    let i = 0;

    do {
        if (id_celula != todasCelulas[i].id_celula) {

            id_celula = todasCelulas[i].id_celula;
            celulasSegmentadas.push({
                id: id_celula,
                tipo_analise_realizada: todasCelulas[i].tipo_analise_realizada,
                descricao: await obterDescricao(todasCelulas[i].id_descricao),
                segmentos_citoplasma: listarSegmentosCitoplasmaPorCelula(req, id_celula, segmentacaoCitoplasma),
                segmentos_nucleo: listarSegmentosNucleoPorCelula(req, id_celula, segmentacaoNucleo)
            });
        }
        i++;

    } while (i < totalCelulas);

    return celulasSegmentadas;
}

function listarCelulas(segmentos) {

    let todasCelulas = [];
    let id_atual = 0;

    segmentos.forEach(celula => {

        if (id_atual != celula.id_celula) {
            todasCelulas.push(celula);
            id_atual = celula.id_celula;
        }
    });

    return todasCelulas;
}

async function obterDescricao(id_descricao) {

    const descricaoCompleta = await ImagemRepositorio.obterDescricaoPorId(id_descricao);
    const descricao = {
        id: descricaoCompleta.dataValues.id,
        nome: descricaoCompleta.dataValues.nome,
        codigo: descricaoCompleta.dataValues.codigo
    };

    return descricao;
}

function listarSegmentosCitoplasmaPorCelula(req, id_celula, segmentosCitoplasma) {

    let segmentosFiltrados = [];

    segmentosCitoplasma.forEach(segmento => {

        if (id_celula == segmento.id_celula) {

            segmentosFiltrados.push({
                coord_x: segmento.coord_x,
                coord_y: segmento.coord_y
            });
        }
    });

    return segmentosFiltrados;
}

function listarSegmentosNucleoPorCelula(req, id_celula, segmentosNucleo) {

    let segmentosFiltrados = [];

    segmentosNucleo.forEach(segmento => {

        if (id_celula == segmento.id_celula) {
            
            segmentosFiltrados.push({
                coord_x: segmento.coord_x,
                coord_y: segmento.coord_y
            });
        }
    });

    return segmentosFiltrados;
}
