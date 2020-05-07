"use strict";

const Sequelize = require("sequelize");

const ImagemModel = require("../models/ImagemModel");
const DescricaoModel = require("../models/DescricaoModel");
const LesaoModel = require("../models/LesaoModel");
const CelulaModel = require("../models/CelulaModel");
const SegmentacaoCitoplasmaModel = require("../models/SegmentacaoCitoplasmaModel");
const SegmentacaoNucleoModel = require("../models/SegmentacaoNucleoModel");
const ClassificacaoModel = require("../models/ClassificacaoCelulaModel");
const Configuracao = require("../utils/enumeracoes/configuracao_lesao_descricao");
const TipoAnalise = require("../utils/enumeracoes/tipo_analise_realizada");
const FonteAquisicao = require("../utils/enumeracoes/fonte_aquisicao");
const db = require("../database");

module.exports = {

    async cadastrarImagem(imagem) {

        return ImagemModel.create({
            nome: imagem.nome,
            doi: imagem.doi,
            codigo_lamina: imagem.codigo_lamina,
            excluida: imagem.excluida,
            classificacao_aprovada: imagem.classificacao_aprovada,
            dt_aquisicao: imagem.dt_aquisicao,
            fonte_aquisicao: imagem.fonte_aquisicao,
            caminho_imagem: imagem.caminho_imagem,
            id_usuario: imagem.id_usuario,
            id_lesao: imagem.id_lesao,
            altura: imagem.altura,
            largura: imagem.largura
        });
    },

    async atualizarDimensoesImagem(id_imagem, novaAltura, novaLargura) {
        return ImagemModel.update({
            altura: novaAltura,
            largura: novaLargura
        },
        {
            where: {
                id: {
                    [Sequelize.Op.eq]: id_imagem
                }
            }
        });
    },

    async processarQuerySql(sqlQuery) {

        let resultado;
        await db.query(
            sqlQuery,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {
                resultado = results;
            });

        return resultado;
    },

    async cadastrarSegmentoCitoplasmaCelula(id_usuario, id_celula, coord_x, coord_y) {

        return SegmentacaoCitoplasmaModel.create({
            coord_x: coord_x,
            coord_y: coord_y,
            id_celula: id_celula,
            id_usuario: id_usuario
        });
    },

    async cadastrarSegmentoNucleoCelula(id_usuario, id_celula, coord_x, coord_y) {

        return SegmentacaoNucleoModel.create({
            coord_x: coord_x,
            coord_y: coord_y,
            id_celula: id_celula,
            id_usuario: id_usuario
        });
    },

    async cadastrarClassificacaoCelula(id_usuario, id_celula, coord_x, coord_y) {

        return ClassificacaoModel.create({
            coord_centro_nucleo_x: coord_x,
            coord_centro_nucleo_y: coord_y,
            id_celula: id_celula,
            id_usuario: id_usuario
        });
    },

    async cadastrarCelulaSegmentada(id_imagem, id_descricao) {

        return CelulaModel.create({
            tipo_analise_realizada: TipoAnalise.SEGMENTACAO,
            id_imagem: id_imagem,
            id_lesao: Configuracao.LESAO_NAO_APLICAVEL,
            id_descricao: id_descricao
        });
    },

    async cadastrarCelulaClassificada(id_imagem, id_lesao) {

        return CelulaModel.create({
            tipo_analise_realizada: TipoAnalise.CLASSIFICACAO,
            id_imagem: id_imagem,
            id_lesao: id_lesao,
            id_descricao: Configuracao.DESCRICAO_NAO_APLICAVEL
        });
    },

    async cadastrarDescricao(descricao) {
        return DescricaoModel.create(descricao);
    },

    async cadastrarLesao(lesao) {
        return LesaoModel.create(lesao);
    },

    async obterImagemPorId(id_imagem) {
        return ImagemModel.findByPk(id_imagem);
    },

    async obterCelulaPorId(id_celula) {
        return CelulaModel.findByPk(id_celula);
    },

    async listarImagens() {
        return ImagemModel.findAll({
            order: [
                ["created_at", "DESC"]
            ]
        });
    },

    async listarImagensValidasNoSistema() {
        return ImagemModel.findAll({
            order: [
                ["created_at", "DESC"]
            ],
            where: {
                excluida: {
                    [Sequelize.Op.eq]: 0
                }
            }
        });
    },

    async listarImagensPorIdVisitante(id_usuario) {
        return ImagemModel.findAll({
            order: [
                ["created_at", "DESC"]
            ],
            where: {
                id_usuario: {
                    [Sequelize.Op.eq]: id_usuario
                },
                fonte_aquisicao: {
                    [Sequelize.Op.eq]: FonteAquisicao.FONTE_AQUISICAO_EXTERNA
                }
            }
        });
    },

    async listarSegmentosCitoplasmaCelula(id_imagem, id_usuario) {

        let todasSegmentacoesCitoplasma;
        const LISTAR_SEGMENTACAO_CITOPLASMA_SQL_QUERY = `
        SELECT
            celula.id AS id_celula,
            celula.tipo_analise_realizada,
            celula.id_descricao,
            segmentacao_citoplasma.coord_x,
            segmentacao_citoplasma.coord_y
        FROM analista
        JOIN segmentacao_citoplasma ON analista.id = segmentacao_citoplasma.id_usuario
        JOIN celula ON celula.id = segmentacao_citoplasma.id_celula
        JOIN imagem ON imagem.id = celula.id_imagem
        WHERE analista.id = ${id_usuario} AND imagem.id = ${id_imagem}`;


        await db.query(
            LISTAR_SEGMENTACAO_CITOPLASMA_SQL_QUERY,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {
                todasSegmentacoesCitoplasma = results;
            });

        return todasSegmentacoesCitoplasma;
    },

    async listarTodosSegmentosNucleoCelula(id_imagem, id_usuario) {

        let todasSegmentacoesNucleo;
        const LISTAR_SEGMENTACAO_NUCLEO_SQL_QUERY = `
        SELECT
            celula.id AS id_celula,
            celula.tipo_analise_realizada,
            celula.id_descricao,
            segmentacao_nucleo.coord_x,
            segmentacao_nucleo.coord_y
        FROM analista
        JOIN segmentacao_nucleo ON analista.id = segmentacao_nucleo.id_usuario
        JOIN celula ON celula.id = segmentacao_nucleo.id_celula
        JOIN imagem ON imagem.id = celula.id_imagem
        WHERE analista.id = ${id_usuario} AND imagem.id = ${id_imagem}`;

        await db.query(
            LISTAR_SEGMENTACAO_NUCLEO_SQL_QUERY,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {
                todasSegmentacoesNucleo = results;
            });

        return todasSegmentacoesNucleo;
    },

    async listarClassificacoesCelula(id_imagem, id_usuario) {

        let todasClassificacoes;
        const LISTAR_CELULAS_PARA_A_IMAGEM_SQL_QUERY = `
        SELECT
            celula.id AS id_celula,
            celula.tipo_analise_realizada,
            celula.id_lesao,
            classificacao_celula.coord_centro_nucleo_x,
            classificacao_celula.coord_centro_nucleo_y,
            classificacao_celula.id AS id_classificacao
        FROM analista
        JOIN classificacao_celula ON analista.id = classificacao_celula.id_usuario
        JOIN celula ON celula.id = classificacao_celula.id_celula
        JOIN imagem ON imagem.id = celula.id_imagem
        WHERE analista.id = ${id_usuario} AND imagem.id = ${id_imagem}`;

        await db.query(
            LISTAR_CELULAS_PARA_A_IMAGEM_SQL_QUERY,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {
                todasClassificacoes = results;
            });

        return todasClassificacoes;
    },

    async obterDescricaoPorId(id_descricao) {
        return DescricaoModel.findByPk(id_descricao);
    },

    async obterLesaoPorId(id_lesao) {
        return LesaoModel.findByPk(id_lesao);
    },

    async listarDescricoes() {
        return DescricaoModel.findAll({
            where: {
                id: {
                    [Sequelize.Op.ne]: 1
                }
            }
        });
    },

    async listarLesoes() {
        return LesaoModel.findAll();
    },

    async excluirImagemPorId(id_imagem) {

        return ImagemModel.destroy({
            where: {
                id: {
                    [Sequelize.Op.eq]: id_imagem
                }
            }
        });
    },

    async excluirCelula(id_celula, id_imagem) {
        return CelulaModel.destroy({
            where: {
                id: {
                    [Sequelize.Op.eq]: id_celula
                },
                id_imagem: {
                    [Sequelize.Op.eq]: id_imagem
                }
            }
        });
    },

    async excluirClassificacaoDeCelula(id_celula) {
        return ClassificacaoModel.destroy({
            where: {
                id_celula: {
                    [Sequelize.Op.eq]: id_celula
                }
            }
        });
    },    

    async excluirSegmentacaoDeCitoplasma(id_celula) {

        return SegmentacaoCitoplasmaModel.destroy({
            where: {
                id_celula: {
                    [Sequelize.Op.eq]: id_celula
                }
            }
        });
    },

    async excluirSegmentacaoDeNucleo(id_celula) {

        return SegmentacaoNucleoModel.destroy({
            where: {
                id_celula: {
                    [Sequelize.Op.eq]: id_celula
                }
            }
        });
    },

    async atualizarImagem(requisicao) {
        return ImagemModel.update({
            codigo_lamina: requisicao.codigo_lamina,
            dt_aquisicao: requisicao.dt_aquisicao,
            id_usuario: requisicao.id_usuario
        },
        {
            where: {
                id: {
                    [Sequelize.Op.eq]: requisicao.id_imagem
                }
            }
        });
    },

    async atualizarCelula(requisicao) {
        return CelulaModel.update({
            id_lesao: requisicao.id_lesao_celula
        },
        {
            where: {
                id: {
                    [Sequelize.Op.eq]: requisicao.id_celula
                },
                id_imagem: {
                    [Sequelize.Op.eq]: requisicao.id_imagem
                }
            }
        });
    },

    async atualizarLesaoImagem(id_imagem, id_lesao) {
        return ImagemModel.update({
            id_lesao: id_lesao
        },
        {
            where: {
                id: {
                    [Sequelize.Op.eq]: id_imagem
                }
            }
        });
    },

    async obterTotalClassificacoesImagem(id_imagem) {
        return CelulaModel.count({
            where: {
                id_imagem: {
                    [Sequelize.Op.eq]: id_imagem
                },
                tipo_analise_realizada: {
                    [Sequelize.Op.eq]: TipoAnalise.CLASSIFICACAO
                }
            }
        });
    },

    async obterTotalSegmentacoesImagem(id_imagem) {
        return CelulaModel.count({
            where: {
                id_imagem: {
                    [Sequelize.Op.eq]: id_imagem
                },
                tipo_analise_realizada: {
                    [Sequelize.Op.eq]: TipoAnalise.SEGMENTACAO
                }
            }
        });
    }
};