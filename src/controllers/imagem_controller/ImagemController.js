"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ImagemController");

const HttpStatus = require("http-status-codes");

const AtualizarClassificacaoExecutor = require("../../executores/imagem_executor/AtualizarClassificacaoExecutor");
const AtualizarDadosImagemExecutor = require("../../executores/imagem_executor/AtualizarDadosImagemExecutor");
const CadastrarClassificacaoCelulaExecutor = require("../../executores/imagem_executor/CadastrarClassificacaoCelulaExecutor");
const CadastrarDescricao = require("../../executores/imagem_executor/CadastrarDescricaoExecutor");
const CadastrarImagemExecutor = require("../../executores/imagem_executor/CadastrarImagemExecutor");
const CadastrarLesaoExecutor = require("../../executores/imagem_executor/CadastrarLesaoExecutor");
const CadastrarSegmentacaoCelulaExecutor = require("../../executores/imagem_executor/CadastrarSegmentacaoCelulaExecutor");
const DownloadBaseExecutor = require("../../executores/imagem_executor/DownloadBaseExecutor");
const ExcluirClassificacaoExecutor = require("../../executores/imagem_executor/ExcluirClassificacaoExecutor");
const ExcluirSegmentacaoExecutor = require("../../executores/imagem_executor/ExcluirSegmentacaoExecutor");
const ListarClassificacaoCelulaExecutor = require("../../executores/imagem_executor/ListarClassificacaoCelulaExecutor");
const ListarDescricao = require("../../executores/imagem_executor/ListarDescricoesExecutor");
const ListarImagensExecutor = require("../../executores/imagem_executor/ListarImagensExecutor");
const ListarLesaoExecutor = require("../../executores/imagem_executor/ListarLesoesExecutor");
const ListarSegmentacaoCelulaExecutor = require("../../executores/imagem_executor/ListarSegmentacaoCelulaExecutor");
const ObterImagemExecutor = require("../../executores/imagem_executor/ObterImagemExecutor");
const delete_image_service = require("../../executores/imagem_executor/delete_image");
const approve_image_service = require("../../executores/imagem_executor/approve_image");
const unapprove_image_service = require("../../executores/imagem_executor/unapprove_image");

module.exports = {

    async cadastrarImagem(req, res, next) {

        let imagemCadastrada;
        try {
            imagemCadastrada = await CadastrarImagemExecutor.Executar(req, res);
            return res.status(HttpStatus.CREATED).json(imagemCadastrada);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async delete_image(req, res, next) {

        try {
            await delete_image_service.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarImagens(req, res, next) {

        let imagens;
        try {
            imagens = await ListarImagensExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(imagens);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async obterImagem(req, res, next) {

        let imagem;
        try {
            imagem = await ObterImagemExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(imagem);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarClassificacaoDeCelula(req, res, next) {
        let classificacoesCadastradas;
        try {
            classificacoesCadastradas = await CadastrarClassificacaoCelulaExecutor.Executar(req, res);
            return res.status(HttpStatus.CREATED).json(classificacoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarSegmentacaoDeCelula(req, res, next) {

        let segmentacoesCadastradas;
        try {
            segmentacoesCadastradas = await CadastrarSegmentacaoCelulaExecutor.Executar(req, res);
            return res.status(HttpStatus.CREATED).json(segmentacoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarClassificacaoDeCelulaParaUmUsuario(req, res, next) {

        let todasClassificacoes;
        try {
            todasClassificacoes = await ListarClassificacaoCelulaExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(todasClassificacoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarSegmentacaoDeCelulaParaUmUsuario(req, res, next) {

        let todasSegmentacoes;
        try {
            todasSegmentacoes = await ListarSegmentacaoCelulaExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(todasSegmentacoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarLesoes(req, res, next) {

        try {
            const injury = await CadastrarLesaoExecutor.Executar(req, res);
            return res.status(HttpStatus.CREATED).json(injury);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarDescricoes(req, res, next) {

        let lesoesCadastradas;
        try {
            lesoesCadastradas = await CadastrarDescricao.Executar(req, res);
            return res.status(HttpStatus.CREATED).json(lesoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarLesoes(req, res, next) {

        let todasLesoes;
        try {
            todasLesoes = await ListarLesaoExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(todasLesoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarDescricoes(req, res, next) {

        let todasDescricoes;
        try {
            todasDescricoes = await ListarDescricao.Executar(req, res);
            return res.status(HttpStatus.OK).json(todasDescricoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async downloadBase(req, res, next) {
        let result;
        try {
            result = DownloadBaseExecutor.Executar(req, res);
            result.then((zip) => {
                res.set("Content-Type", "application/zip");
                zip
                    .pipe(res, next)
                    .on("finish", function () {
                        debug("Zip file with dump of image + data sent to user.");
                    });

            })
                .catch((err) => {
                    debug(`Failed to send zip file to user because of ${err}`);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
                });
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async excluirRegistroClassificacao(req, res, next) {

        try {
            await ExcluirClassificacaoExecutor.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async excluirRegistroSegmentacao(req, res, next) {

        try {
            await ExcluirSegmentacaoExecutor.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async atualizarDadosImagem(req, res, next) {

        try {
            await AtualizarDadosImagemExecutor.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async approve_image(req, res, next) {

        try {
            await approve_image_service.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async unapprove_image(req, res, next) {

        try {
            await unapprove_image_service.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async atualizarClassificacao(req, res, next) {

        try {
            await AtualizarClassificacaoExecutor.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    }
};
