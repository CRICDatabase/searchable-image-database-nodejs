"use strict";

const express = require("express");
const UsuarioController = require("../controllers/usuario_controller/UsuarioController");

const rotasUsuario = express.Router();

//Rotas de usuario POST
rotasUsuario.post("/api/v1/usuarios", UsuarioController.cadastrarUsuarioBase);
rotasUsuario.post("/api/v1/usuarios-administrador", UsuarioController.cadastrarUsuarioAdministrador);
rotasUsuario.post("/api/v1/usuarios-citopatologista", UsuarioController.cadastrarUsuarioCitopatologista);
rotasUsuario.post("/api/v1/usuarios-visitante", UsuarioController.cadastrarUsuarioVisitante);
rotasUsuario.post("/api/v1/usuarios/analista/:id_usuario", UsuarioController.cadastrarAnalista);
rotasUsuario.post("/api/v1/usuarios/:id_usuario_adm/citopatologista/:id_usuario", UsuarioController.tornarCitopatologista);
rotasUsuario.post("/api/v1/usuarios/:id_usuario", UsuarioController.obterUsuario);
rotasUsuario.post("/api/v1/login", UsuarioController.login);
rotasUsuario.post("/api/v1/reset-password", UsuarioController.reset_password);

//Rotas de usuario GET
rotasUsuario.get("/api/v1/usuarios/:id_usuario?", UsuarioController.listarUsuarios);
rotasUsuario.get("/api/v1/usuarios/:id_usuario/administrador", UsuarioController.obterAdministrador);
rotasUsuario.get("/api/v1/usuarios/:id_usuario/citopatologista", UsuarioController.obterCitopatologista);
rotasUsuario.get("/api/v1/usuarios/:id_usuario/visitante", UsuarioController.obterVisitante);
rotasUsuario.get("/api/v1/usuarios/:id_usuario/analista", UsuarioController.obterAnalista);

//Rotas PATCH - Despriorizada do MVC

//Rotas DELETE - Despriorizada do MVC
rotasUsuario.delete("/api/v1/usuarios/:token_autenticacao", UsuarioController.fazerLogOff);

//Exporta o módulo de rotas
module.exports = rotasUsuario;
