"use strict";

const express = require("express");

// eslint-disable-next-line no-unused-vars
const SistemaController = require("../controllers/sistema/SistemaController");
const ImagemController = require("../controllers/imagem_controller/ImagemController");

const rotasLesoes = express.Router();

rotasLesoes.get("/api/v1/lesoes", ImagemController.listarLesoes);
rotasimagem.get("/api/v1/imagens-lesoes", ImagemController.listarLesoes); // TODO Remove in v2
rotasLesoes.post("/api/v1/lesoes", ImagemController.cadastrarLesoes);
rotasLesoes.post("/api/v1/imagens-lesoes/:id_usuario(\\d+)", ImagemController.cadastrarLesoes); // TODO Remove in v2

rotasLesoes.get("/api/v1/lesoes/:id_lesoes(\\d+)", SistemaController.not_implemented);
rotasLesoes.put("/api/v1/lesoes/:id_lesoes(\\d+)", SistemaController.not_implemented);
rotasLesoes.delete("/api/v1/lesoes/:id_lesoes(\\d+)", SistemaController.not_implemented);

module.exports = rotasLesoes;
