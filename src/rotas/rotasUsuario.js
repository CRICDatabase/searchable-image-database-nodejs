"use strict";

const express = require("express");

// eslint-disable-next-line no-unused-vars
const SistemaController = require("../controllers/sistema/SistemaController");
const UsuarioController = require("../controllers/usuario_controller/UsuarioController");

const rotasUsuario = express.Router();

rotasUsuario.get("/api/v1/usuarios", UsuarioController.listarUsuarios);
rotasUsuario.post("/api/v1/usuarios", UsuarioController.cadastrarUsuarioBase);

rotasUsuario.get("/api/v1/usuarios/:id_usuario", UsuarioController.listarUsuarios);
rotasUsuario.put("/api/v1/usuarios/:id_usuario", SistemaController.not_implemented);
rotasUsuario.delete("/api/v1/usuarios/:id_usuario", SistemaController.not_implemented);

rotasUsuario.post("/api/v1/usuarios/:id_usuario/admin", SistemaController.not_implemented);
rotasUsuario.delete("/api/v1/usuarios/:id_usuario/admin", SistemaController.not_implemented);

rotasUsuario.post("/api/v1/login", UsuarioController.login); // TODO Remove in v2
rotasUsuario.post("/api/v1/usuarios/login", UsuarioController.login);

rotasUsuario.delete("/api/v1/usuarios/:Authorization", UsuarioController.fazerLogOff); // TODO Remove in v2
rotasUsuario.post("/api/v1/usuarios/logout", SistemaController.not_implemented);

rotasUsuario.post("/api/v1/usuarios/senha/trocar", SistemaController.not_implemented);

rotasUsuario.post("/api/v1/reset-password", UsuarioController.reset_password); // TODO Remove in v2
rotasUsuario.post("/api/v1/usuarios/senha/recuperar", UsuarioController.reset_password);

module.exports = rotasUsuario;
