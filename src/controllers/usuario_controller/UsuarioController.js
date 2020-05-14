"use strict";

const HttpStatus = require("http-status-codes");
const CadastrarUsuarioExecutor = require("../../executores/usuario_executor/CadastrarUsuarioBaseExcutor");
const CadastrarAdminExecutor = require("../../executores/usuario_executor/CadastrarAdministradorExecutor");
const CadastrarCitopatologistaExecutor = require("../../executores/usuario_executor/CadastrarCitopatologistaExecutor");
const CadastrarVisitanteExecutor = require("../../executores/usuario_executor/CadastrarVisitanteExecutor");
const CadastrarAnalistaExecutor = require("../../executores/usuario_executor/CadastrarAnalistaExecutor");
const ListarUsuariosExecutor = require("../../executores/usuario_executor/ListarUsuariosExecutor");
const ObterUsuarioBaseExecutor = require("../../executores/usuario_executor/ObterUsuarioExecutor");
const LoginService = require("../../executores/usuario_executor/LoginService");
const RememberPasswordService = require("../../executores/usuario_executor/RememberPasswordService");
const ObterAdministradorExecutor = require("../../executores/usuario_executor/ObterAdministradorExecutor");
const ObterCitopatologistaExecutor = require("../../executores/usuario_executor/ObterCitopatologistaExecutor");
const ObterVisitanteExecutor = require("../../executores/usuario_executor/ObterVisitanteExecutor");
const ObterAnalistaExecutor = require("../../executores/usuario_executor/ObterAnalistaExecutor");
const FazerLogOffExecutor = require("../../executores/usuario_executor/FazerLogOffExecutor");
const TornarCitopatologistaExecutor = require("../../executores/usuario_executor/TornarCitopatologistaExecutor");

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

    async cadastrarUsuarioAdministrador(req, res) {

        let admCadastrado;
        try{
            admCadastrado = await CadastrarAdminExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(admCadastrado);
        }
        catch(erro){

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

    async cadastrarUsuarioCitopatologista(req, res) {

        let citopatologistaCadastrado;
        try{
            citopatologistaCadastrado = await CadastrarCitopatologistaExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(citopatologistaCadastrado);
        }
        catch(erro){

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

    async cadastrarUsuarioVisitante(req, res) {

        let visitanteCadastrado;
        try{
            visitanteCadastrado = await CadastrarVisitanteExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(visitanteCadastrado); 
        }
        catch(erro){

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

    async cadastrarAnalista(req, res) {

        let analistaCadastrado;
        try{
            analistaCadastrado = await CadastrarAnalistaExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(analistaCadastrado);
        }
        catch(erro) {

            if(erro.status == HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json(erro);
            }

            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.CONFLICT) {
                return res.status(HttpStatus.CONFLICT).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            if (erro.status == HttpStatus.FORBIDDEN) {
                return res.status(HttpStatus.FORBIDDEN).json(erro);
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

    async obterAdministrador(req, res) {

        let administrador;
        try{
            administrador = await ObterAdministradorExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(administrador);
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

    async obterCitopatologista(req, res) {

        let citopatologista;
        try{
            citopatologista = await ObterCitopatologistaExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(citopatologista); 
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

    async obterVisitante(req, res) {

        let visitante;
        try{
            visitante = await ObterVisitanteExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(visitante); 
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

    async obterAnalista(req, res) {

        let analista;
        try{
            analista = await ObterAnalistaExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(analista); 
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

    async tornarCitopatologista(req, res) {

        let novoCitopatologista;
        try{
            novoCitopatologista = await TornarCitopatologistaExecutor.Executar(req);
            return res.status(HttpStatus.CREATED).json(novoCitopatologista);
        }
        catch(erro) {

            if(erro.status == HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json(erro);
            }

            if(erro.status == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            if(erro.status == HttpStatus.CONFLICT) {
                return res.status(HttpStatus.CONFLICT).json(erro);
            }

            if(erro.status == HttpStatus.UNAUTHORIZED) {
                return res.status(HttpStatus.UNAUTHORIZED).json(erro);
            }

            if (erro.status == HttpStatus.FORBIDDEN) {
                return res.status(HttpStatus.FORBIDDEN).json(erro);
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

    async remember_password(req, res) {

        try{
            await RememberPasswordService(req);
            return res.status(HttpStatus.OK);
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
