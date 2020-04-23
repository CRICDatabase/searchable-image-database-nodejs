"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("./enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");
const UsuarioRepositorio = require("../repositorios/usuario_repositorio");

module.exports = {

    async validate_token(req, res, next) {

        if (req.headers.authorization) {
            const users = await UsuarioRepositorio.validarToken(req.headers.authorization);
            if (users.length) {
                next()
            }
            else {
                ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
                ObjetoExcecao.title = "Authorization token is invalid";
                ObjetoExcecao.detail = "Please check the Authorization token for typos";
                return res.status(HttpStatus.UNAUTHORIZED).json(ObjetoExcecao);    
            }
        }
        else {
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = "Missed Authorization header";
            ObjetoExcecao.detail = "Please provide Authorization header";
            return res.status(HttpStatus.UNAUTHORIZED).json(ObjetoExcecao);
        }
        
    }
    
};
