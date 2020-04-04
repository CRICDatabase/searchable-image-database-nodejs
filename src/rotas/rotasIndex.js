'use strict'

const express = require('express');
const rotasIndex = express.Router();
const SistemaController = require('../controllers/sistema/SistemaController');

//Rotas POST

//Rotas GET
rotasIndex.get('/api/v1', SistemaController.consultarStatusDoSistema);

//Rotas PUT

//Rotas Delete


//Exportação do modulo
module.exports = rotasIndex;
