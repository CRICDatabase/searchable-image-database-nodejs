"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:UsuarioController");

const HttpStatus = require("http-status-codes");

const CadastrarUsuarioExecutor = require("../../executores/usuario_executor/CadastrarUsuarioBaseExcutor");
const FazerLogOffExecutor = require("../../executores/usuario_executor/FazerLogOffExecutor");
const ListarUsuariosExecutor = require("../../executores/usuario_executor/ListarUsuariosExecutor");
const LoginService = require("../../executores/usuario_executor/LoginService");
const ObterUsuarioBaseExecutor = require("../../executores/usuario_executor/ObterUsuarioExecutor");
const ResetPasswordService = require("../../executores/usuario_executor/ResetPasswordService");
const DeleteUserService = require("../../executores/usuario_executor/DeleteUserService");
const MakeAdminService = require("../../executores/usuario_executor/MakeAdminService");
const RemoveAdminService = require("../../executores/usuario_executor/RemoveAdminService");

module.exports = {

    async cadastrarUsuarioBase(req, res, next) {

        let usuarioCriado;
        try{
            usuarioCriado = await CadastrarUsuarioExecutor.Executar(req, res);
            return res.status(HttpStatus.CREATED).json(usuarioCriado);
        }
        catch(erro) {
            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async listarUsuarios(req, res, next) {

        let usuarios;
        try{
            usuarios = await ListarUsuariosExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(usuarios); 
        }
        catch(erro) {

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async obterUsuario(req, res, next) {

        let usuarioBase;
        try{
            usuarioBase = await ObterUsuarioBaseExecutor.Executar(req, res);
            return res.status(HttpStatus.OK).json(usuarioBase);
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }        
    },

    async delete_user(req, res, next) {

        try{
            await DeleteUserService.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async make_admin(req, res, next) {

        try{
            await MakeAdminService.Executar(req, res);
            return res.status(HttpStatus.OK).end();
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async remove_admin(req, res, next) {

        try{
            await RemoveAdminService.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async login(req, res, next) {

        let usuarioBase;
        try{
            usuarioBase = await LoginService.Executar(req, res);
            return res.status(HttpStatus.OK).json(usuarioBase);
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    },

    async reset_password(req, res, next) {
        try{
            await ResetPasswordService.Executar(req, res);
            return res.status(HttpStatus.OK).end();
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }        
    },

    async fazerLogOff(req, res, next) {

        try{
            await FazerLogOffExecutor.Executar(req, res);
            return res.status(HttpStatus.NO_CONTENT).end();
        }
        catch(erro){

            if(erro.status) {
                return res.status(erro.status).json(erro);
            }

            debug(erro);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(erro);
        }
    }

};
