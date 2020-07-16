"use strict";

const express = require("express");

// eslint-disable-next-line no-unused-vars
const SistemaController = require("../controllers/sistema/SistemaController");
const ImagemController = require("../controllers/imagem_controller/ImagemController");

const rotasDescricoes = express.Router();

rotasDescricoes.get("/api/v1/descricoes", ImagemController.listarDescricoes);
-rotasImagem.get("/api/v1/imagens-descricoes", ImagemController.listarDescricoes); // TODO Remove in v2
rotasDescricoes.post("/api/v1/descricoes", ImagemController.cadastrarDescricoes);
rotasDescricoes.post("/api/v1/imagens-descricoes/:id_usuario(\\d+)", ImagemController.cadastrarDescricoes); // TODO Remove in v2

rotasDescricoes.get("/api/v1/descricoes/:id_descricoes(\\d+)", SistemaController.not_implemented);
rotasDescricoes.put("/api/v1/descricoes/:id_descricoes(\\d+)", SistemaController.not_implemented);
rotasDescricoes.delete("/api/v1/descricoes/:id_descricoes(\\d+)", SistemaController.not_implemented);

module.exports = rotasDescricoes;
