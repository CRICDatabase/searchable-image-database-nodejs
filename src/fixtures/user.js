"use strict";

const Criptografia = require("../utils/criptografia");

module.exports = {
    fixtures:  [
        {
            id: 1,
            primeiro_nome: "admin",
            ultimo_nome: "",
            email: "admin@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 1,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        },
        {
            id: 2,
            primeiro_nome: "Charles",
            ultimo_nome: "",
            email: "charles@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 0,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        }
    ]
};
