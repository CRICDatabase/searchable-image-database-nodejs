"use strict";

const express = require("express");

const auth_middleware = require("../utils/auth_middleware");

// eslint-disable-next-line no-unused-vars
const SistemaController = require("../controllers/sistema/SistemaController");
const ImagemController = require("../controllers/imagem_controller/ImagemController");

const rotasDescricoes = express.Router();

rotasDescricoes.get("/api/v1/descricoes", ImagemController.listarDescricoes);
rotasDescricoes.get("/api/v1/imagens-descricoes", ImagemController.listarDescricoes); // TODO Remove in v2
rotasDescricoes.post("/api/v1/descricoes", auth_middleware.admin_required, ImagemController.cadastrarDescricoes);
rotasDescricoes.post("/api/v1/imagens-descricoes/:id_usuario(\\d+)", auth_middleware.admin_required, ImagemController.cadastrarDescricoes); // TODO Remove in v2

rotasDescricoes.get("/api/v1/descricoes/:id_descricoes(\\d+)", SistemaController.not_implemented);
rotasDescricoes.put("/api/v1/descricoes/:id_descricoes(\\d+)", auth_middleware.admin_required, SistemaController.not_implemented);
rotasDescricoes.delete("/api/v1/descricoes/:id_descricoes(\\d+)", auth_middleware.admin_required, SistemaController.not_implemented);

module.exports = rotasDescricoes;
