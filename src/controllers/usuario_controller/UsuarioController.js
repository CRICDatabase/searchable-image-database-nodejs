"use strict";

const HttpStatus = require("http-status-codes");
const CadastrarUsuarioExecutor = require("../../executores/usuario_executor/CadastrarUsuarioBaseExcutor");
const ListarUsuariosExecutor = require("../../executores/usuario_executor/ListarUsuariosExecutor");
const ObterUsuarioBaseExecutor = require("../../executores/usuario_executor/ObterUsuarioExecutor");
const LoginService = require("../../executores/usuario_executor/LoginService");
const ResetPasswordService = require("../../executores/usuario_executor/ResetPasswordService");
const FazerLogOffExecutor = require("../../executores/usuario_executor/FazerLogOffExecutor");

module.exports = {

    async cadastrarUsuarioBase(req, res) {

        let usuarioCriado;
        try{
            usuarioCriado = await CadastrarUsuarioExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(usuarioCriado);
        }
        catch(erro) {
            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.CONFLICT) {
                return res.status(HttpStatus.CONFLICT).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarUsuarios(req, res) {

        let usuarios;
        try{
            usuarios = await ListarUsuariosExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(usuarios); 
        }
        catch(erro) {

            if(erro.status == HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async obterUsuario(req, res) {

        let usuarioBase;
        try{
            usuarioBase = await ObterUsuarioBaseExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(usuarioBase);
        }
        catch(erro){

            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }        
    },

    async login(req, res) {

        let usuarioBase;
        try{
            usuarioBase = await LoginService.Executar(req);
            return res.status(HttpStatus.OK).json(usuarioBase);
        }
        catch(erro){

            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }        
    },

    async reset_password(req, res) {
        try{
            await ResetPasswordService.Executar(req);
            return res.status(HttpStatus.OK).end();
        }
        catch(erro){

            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }        
    },

    async fazerLogOff(req, res) {

        let retorno;
        try{
            retorno = await FazerLogOffExecutor.Executar(req);
            return res.status(HttpStatus.ACCEPTED).json(retorno); 
        }
        catch(erro){

            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    }

};
