"use strict";

const express = require("express");

const auth_middleware = require("../utils/auth_middleware");

// eslint-disable-next-line no-unused-vars
const SistemaController = require("../controllers/sistema/SistemaController");
const ImagemController = require("../controllers/imagem_controller/ImagemController");

const rotasImagem = express.Router();

rotasImagem.get("/api/v1/imagens", ImagemController.listarImagens);
rotasImagem.post("/api/v1/imagens", auth_middleware.login_required, ImagemController.cadastrarImagem);

rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)", ImagemController.obterImagem);
rotasImagem.put("/api/v1/imagens/:id_imagem(\\d+)", auth_middleware.login_required, ImagemController.atualizarDadosImagem);
rotasImagem.delete("/api/v1/imagens/:id_imagem(\\d+)", auth_middleware.login_required, SistemaController.not_implemented);

rotasImagem.post("/api/v1/imagens/:id_imagem(\\d+)/aprovada", auth_middleware.admin_required, ImagemController.approve_image);
rotasImagem.delete("/api/v1/imagens/:id_imagem(\\d+)/aprovada", auth_middleware.admin_required, ImagemController.unapprove_image);

rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)/classificacoes", SistemaController.not_implemented);
rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)/listar-classificacao-celula/:id_usuario(\\d+)", ImagemController.listarClassificacaoDeCelulaParaUmUsuario); // TODO Remove in v2
rotasImagem.post("/api/v1/imagens/:id_imagem(\\d+)/classificacoes", auth_middleware.login_required, SistemaController.not_implemented);
rotasImagem.post("/api/v1/imagens/:id_imagem(\\d+)/classificacao-celula/:id_usuario(\\d+)", auth_middleware.login_required, ImagemController.cadastrarClassificacaoDeCelula); // TODO Remove in v2

rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)/classificacoes/:id_celula(\\d+)", SistemaController.not_implemented);
rotasImagem.put("/api/v1/imagens/:id_imagem(\\d+)/classificacoes/:id_celula(\\d+)", auth_middleware.login_required, SistemaController.not_implemented);
rotasImagem.put("/api/v1/imagens/:id_imagem(\\d+)/classificacao-celula/:id_celula(\\d+)", auth_middleware.login_required, ImagemController.atualizarClassificacao); // TODO Remove in v2
rotasImagem.delete("/api/v1/imagens/:id_imagem(\\d+)/classificacoes/:id_celula(\\d+)", auth_middleware.login_required, SistemaController.not_implemented);
rotasImagem.delete("/api/v1/imagens/:id_imagem(\\d+)/classificacao-celula/:id_celula(\\d+)", auth_middleware.login_required, ImagemController.excluirRegistroClassificacao); // TODO Remove in v2

rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)/segmentacoes", SistemaController.not_implemented);
rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)/listar-segmentacao-celula/:id_usuario", ImagemController.listarSegmentacaoDeCelulaParaUmUsuario); // TODO Remove in v2
rotasImagem.post("/api/v1/imagens/:id_imagem(\\d+)/segmentacoes", auth_middleware.login_required, SistemaController.not_implemented);
rotasImagem.post("/api/v1/imagens/:id_imagem(\\d+)/segmentacao-celula/:id_usuario", auth_middleware.login_required, ImagemController.cadastrarSegmentacaoDeCelula); // TODO Remove in v2

rotasImagem.get("/api/v1/imagens/:id_imagem(\\d+)/segmentacoes/:id_celula(\\d+)", SistemaController.not_implemented);
rotasImagem.put("/api/v1/imagens/:id_imagem(\\d+)/segmentacoes/:id_celula(\\d+)", auth_middleware.login_required, SistemaController.not_implemented);
rotasImagem.delete("/api/v1/imagens/:id_imagem(\\d+)/segmentacoes/:id_celula(\\d+)", auth_middleware.login_required, SistemaController.not_implemented);
rotasImagem.delete("/api/v1/imagens/:id_imagem(\\d+)/segmentacao-celula/:id_celula(\\d+)", auth_middleware.login_required, ImagemController.excluirRegistroSegmentacao); // TODO Remove in v2

rotasImagem.get("/api/v1/imagens/export", ImagemController.downloadBase);
rotasImagem.get("/api/v1/imagens/download", ImagemController.downloadBase); // TODO Remove in v2

module.exports = rotasImagem;
