/* Create admin user */
"use strict";

const Criptografia = require("../utils/criptografia");

/* Load Models */
const connection = require("../database");
const Usuario_Base = require("../models/UsuarioBaseModel");
const Administrador = require("../models/AdministradorModel");

Usuario_Base.create({
    primeiro_nome: "Raniere",
    ultimo_nome: "Silva",
    email: "raniere@rgaiacs.com",
    senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
    ativo: 1
}).then(user => {
/* PHP version did NOT have user permission well defined.
    We are giving all users all the permissions at this moment. */
    Administrador.create({
        id: user.id,
        api_key: "bb3058956119997e380d8",
        nivel_acesso: "TOTAL"
    });
});