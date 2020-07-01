"use strict";

const express = require("express");
const ImagemController = require("../controllers/imagem_controller/ImagemController");
const rotasImagem = express.Router();

//Rotas de imagem POST
rotasImagem.post("/api/v1/imagens", ImagemController.cadastrarImagem);
rotasImagem.post("/api/v1/imagens/:id_imagem/classificacao-celula/:id_usuario", ImagemController.cadastrarClassificacaoDeCelula);
rotasImagem.post("/api/v1/imagens/:id_imagem/segmentacao-celula/:id_usuario", ImagemController.cadastrarSegmentacaoDeCelula);
rotasImagem.post("/api/v1/imagens-lesoes/:id_usuario", ImagemController.cadastrarLesoes);
rotasImagem.post("/api/v1/imagens-descricoes/:id_usuario", ImagemController.cadastrarDescricoes);

//Rotas de imagem GET
rotasImagem.get("/api/v1/imagens/listar/:id_usuario", ImagemController.listarImagens);
rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)", ImagemController.obterImagem);
rotasImagem.get("/api/v1/imagens-lesoes", ImagemController.listarLesoes);
rotasImagem.get("/api/v1/imagens-descricoes", ImagemController.listarDescricoes);
rotasImagem.get("/api/v1/imagens/contagem/lesoes/descricoes", ImagemController.obterContagemLesoesEDescricoesNucleos);
rotasImagem.get("/api/v1/imagens/:id_imagem/listar-classificacao-celula/:id_usuario", ImagemController.listarClassificacaoDeCelulaParaUmUsuario);
rotasImagem.get("/api/v1/imagens/:id_imagem/listar-segmentacao-celula/:id_usuario", ImagemController.listarSegmentacaoDeCelulaParaUmUsuario);
rotasImagem.get("/api/v1/imagens/download", ImagemController.downloadBase);

//Rotas de imagem PUT
rotasImagem.put("/api/v1/imagens/:id_imagem/atualizar/:id_usuario", ImagemController.atualizarDadosImagem);

//Rotas de imagem DELETE
rotasImagem.delete("/api/v1/imagens/:id_imagem/classificacao-celula/:id_celula", ImagemController.excluirRegistroClassificacao);
rotasImagem.delete("/api/v1/imagens/:id_imagem/segmentacao-celula/:id_celula", ImagemController.excluirRegistroSegmentacao);

module.exports = rotasImagem;
