"use strict";

const HttpStatus = require("http-status-codes");
const debug = require("debug")("database.cric:ImageController");

const CadastrarImagemExecutor = require("../../executores/imagem_executor/CadastrarImagemExecutor");
const ListarImagensExecutor = require("../../executores/imagem_executor/ListarImagensExecutor");
const ObterImagemExecutor = require("../../executores/imagem_executor/ObterImagemExecutor");
const CadastrarClassificacaoCelulaExecutor = require("../../executores/imagem_executor/CadastrarClassificacaoCelulaExecutor");
const ListarClassificacaoCelulaExecutor = require("../../executores/imagem_executor/ListarClassificacaoCelulaExecutor");
const CadastrarSegmentacaoCelulaExecutor = require("../../executores/imagem_executor/CadastrarSegmentacaoCelulaExecutor");
const ListarSegmentacaoCelulaExecutor = require("../../executores/imagem_executor/ListarSegmentacaoCelulaExecutor");
const CadastrarLesaoExecutor = require("../../executores/imagem_executor/CadastrarLesaoExecutor");
const ListarLesaoExecutor = require("../../executores/imagem_executor/ListarLesoesExecutor");
const CadastrarDescricao = require("../../executores/imagem_executor/CadastrarDescricaoExecutor");
const ListarDescricao = require("../../executores/imagem_executor/ListarDescricoesExecutor");
const ListarContagemLesoesEDescricoesNucleosExecutor = require("../../executores/imagem_executor/ListarContagemLesoesEDescricoesNucleos");
const DownloadBaseExecutor = require("../../executores/imagem_executor/DownloadBaseExecutor");
const ExcluirClassificacaoExecutor = require("../../executores/imagem_executor/ExcluirClassificacaoExecutor");
const ExcluirSegmentacaoExecutor = require("../../executores/imagem_executor/ExcluirSegmentacaoExecutor");
const AtualizarDadosImagemExecutor = require("../../executores/imagem_executor/AtualizarDadosImagemExecutor");

module.exports = {

    async cadastrarImagem(req, res) {

        let imagemCadastrada;
        try {
            imagemCadastrada = await CadastrarImagemExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(imagemCadastrada);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarImagens(req, res) {

        let imagens;
        try {
            imagens = await ListarImagensExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(imagens);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async obterImagem(req, res) {

        let imagem;
        try {
            imagem = await ObterImagemExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(imagem);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarClassificacaoDeCelula(req, res) {

        let classificacoesCadastradas;
        try {
            classificacoesCadastradas = await CadastrarClassificacaoCelulaExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(classificacoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarSegmentacaoDeCelula(req, res) {

        let segmentacoesCadastradas;
        try {
            segmentacoesCadastradas = await CadastrarSegmentacaoCelulaExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(segmentacoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarClassificacaoDeCelulaParaUmUsuario(req, res) {

        let todasClassificacoes;
        try {
            todasClassificacoes = await ListarClassificacaoCelulaExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(todasClassificacoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarSegmentacaoDeCelulaParaUmUsuario(req, res) {

        let todasSegmentacoes;
        try {
            todasSegmentacoes = await ListarSegmentacaoCelulaExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(todasSegmentacoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarLesoes(req, res) {

        let lesoesCadastradas;
        try {
            lesoesCadastradas = await CadastrarLesaoExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(lesoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async cadastrarDescricoes(req, res) {

        let lesoesCadastradas;
        try {
            lesoesCadastradas = await CadastrarDescricao.Executar(req);
            return res.status(HttpStatus.CREATED).json(lesoesCadastradas);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarLesoes(req, res) {

        let todasLesoes;
        try {
            todasLesoes = await ListarLesaoExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(todasLesoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarDescricoes(req, res) {

        let todasDescricoes;
        try {
            todasDescricoes = await ListarDescricao.Executar(req);
            return res.status(HttpStatus.OK).json(todasDescricoes);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async obterContagemLesoesEDescricoesNucleos(req, res) {

        let resultado;
        try {
            resultado = await ListarContagemLesoesEDescricoesNucleosExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(resultado);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async downloadBase(req, res) {
        let result;
        try {
            result = DownloadBaseExecutor.Executar(req);
            result.then((zip) => {
                res.set("Content-Type", "application/zip");
                zip
                    .pipe(res)
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

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async excluirRegistroClassificacao(req, res) {

        let resultado;
        try {
            resultado = await ExcluirClassificacaoExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(resultado);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async excluirRegistroSegmentacao(req, res) {

        let resultado;
        try {
            resultado = await ExcluirSegmentacaoExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(resultado);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async atualizarDadosImagem(req, res) {

        let resultado;
        try {
            resultado = await AtualizarDadosImagemExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(resultado);
        }
        catch (erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    }
};
