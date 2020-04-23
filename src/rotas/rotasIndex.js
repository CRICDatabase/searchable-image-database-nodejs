"use strict";

const express = require("express");
const rotasIndex = express.Router();
const SistemaController = require("../controllers/sistema/SistemaController");
const authorization = require("../utils/authorization");

//Rotas POST

//Rotas GET
rotasIndex.get("/api/v1", SistemaController.consultarStatusDoSistema);
rotasIndex.get("/api/v2", authorization.validate_token, SistemaController.consultarStatusDoSistema);

//Rotas PUT

//Rotas Delete


//Exportação do modulo
module.exports = rotasIndex;
