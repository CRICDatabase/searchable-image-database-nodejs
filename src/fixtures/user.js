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
        },
        {
            id: 3,
            primeiro_nome: "Amelia",
            ultimo_nome: "",
            email: "amelia@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 0,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        },
        {
            id: 4,
            primeiro_nome: "Amara",
            ultimo_nome: "",
            email: "amara@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 0,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        },
        {
            id: 5,
            primeiro_nome: "Liam",
            ultimo_nome: "",
            email: "liam@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 0,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        },
        {
            id: 6,
            primeiro_nome: "Asher",
            ultimo_nome: "",
            email: "asher@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 0,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        },
        {
            id: 7,
            primeiro_nome: "Atlas",
            ultimo_nome: "",
            email: "atlas@test.database.cric.com.br",
            senha: Criptografia.criarCriptografiaMd5Utf8("123.456"),
            ativo: 1,
            admin: 1,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        }
    ]
};
