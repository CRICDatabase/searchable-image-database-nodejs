'use strict'

const config = require('config');
const cors = require('cors');
const express = require('express');
const FileUpload = require('express-fileupload');

const rotasIndex = require('./rotas/rotasIndex');
const rotasUsuario = require('./rotas/rotasUsuario');
const rotasImagem = require('./rotas/rotasImagem');
const rotasDeTeste = require('./rotas/rotaDeTestes');

require('./database'); //Obtem a conexão com a base de dados

const app = express();
app.use(express.static(__dirname + '/assets')); //Configura caminho estático para acesso via URL
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(FileUpload({ limits: { fileSize: 50 * 1024 * 1024 },})); //Limita o tamanho do arquivo a ser upado a 50Mb

const corsConfig = {
    origin: config.get('origin'),
    optionsSuccessStatus: 200,
}

app.use(cors(corsConfig)); //Lidando com politica CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

//Rotas do sistema
app.use('/', rotasIndex);
app.use('/', rotasUsuario);
app.use('/', rotasImagem);
app.use('/', rotasDeTeste);

const porta = process.env.PORT || 3000;
app.listen(porta);
console.log('Servidor iniciado em: http://localhost:' + porta);
