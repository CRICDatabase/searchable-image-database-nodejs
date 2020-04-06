"use strict";

const express = require("express");
const TesteController = require("../controllers/teste_controller/TesteController");

const rotasDeTeste = express.Router();

//Rotas de usuario POST

//Rotas de usuario GET
rotasDeTeste.get("/teste_01", TesteController.metodoTeste_01);
rotasDeTeste.get("/escrevendo-promise", TesteController.escrevendoUmaPromise);


//Rotas PATCH - Despriorizada do MVC

//Rotas DELETE - Despriorizada do MVC

//Exporta o módulo de rotas
module.exports = rotasDeTeste;