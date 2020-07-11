"use strict";

const express = require("express");
const UsuarioController = require("../controllers/usuario_controller/UsuarioController");

const rotasUsuario = express.Router();

//Rotas de usuario POST
rotasUsuario.post("/api/v1/usuarios", UsuarioController.cadastrarUsuarioBase);
rotasUsuario.post("/api/v1/login", UsuarioController.login);
rotasUsuario.post("/api/v1/reset-password", UsuarioController.reset_password);

//Rotas de usuario GET
rotasUsuario.get("/api/v1/usuarios/:id_usuario?", UsuarioController.listarUsuarios);

//Rotas PATCH - Despriorizada do MVC

//Rotas DELETE - Despriorizada do MVC
rotasUsuario.delete("/api/v1/usuarios/:Authorization", UsuarioController.fazerLogOff);

//Exporta o módulo de rotas
module.exports = rotasUsuario;
