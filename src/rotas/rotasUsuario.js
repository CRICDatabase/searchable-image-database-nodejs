"use strict";

const express = require("express");

const auth_middleware = require("../utils/auth_middleware");

// eslint-disable-next-line no-unused-vars
const SistemaController = require("../controllers/sistema/SistemaController");
const UsuarioController = require("../controllers/usuario_controller/UsuarioController");

const rotasUsuario = express.Router();

rotasUsuario.get("/api/v1/usuarios", UsuarioController.listarUsuarios);
rotasUsuario.post("/api/v1/usuarios", UsuarioController.cadastrarUsuarioBase);

rotasUsuario.get("/api/v1/usuarios/:id_usuario", UsuarioController.obterUsuario);
rotasUsuario.put("/api/v1/usuarios/:id_usuario", auth_middleware.login_required, SistemaController.not_implemented);
rotasUsuario.delete("/api/v1/usuarios/:id_usuario", auth_middleware.login_required, UsuarioController.delete_user);

rotasUsuario.post("/api/v1/usuarios/:id_usuario/admin", auth_middleware.admin_required, UsuarioController.make_admin);
rotasUsuario.delete("/api/v1/usuarios/:id_usuario/admin", auth_middleware.admin_required, UsuarioController.remove_admin);

rotasUsuario.post("/api/v1/login", UsuarioController.login); // TODO Remove in v2
rotasUsuario.post("/api/v1/usuarios/login", UsuarioController.login);

rotasUsuario.post("/api/v1/usuarios/logout", UsuarioController.fazerLogOff);

rotasUsuario.post("/api/v1/usuarios/senha/trocar", auth_middleware.login_required, SistemaController.not_implemented);

rotasUsuario.post("/api/v1/reset-password", UsuarioController.reset_password); // TODO Remove in v2
rotasUsuario.post("/api/v1/usuarios/senha/recuperar", UsuarioController.reset_password);

module.exports = rotasUsuario;
