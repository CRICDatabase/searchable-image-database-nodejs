"use strict";

jest.useFakeTimers();

let SessionDAO = require("./sessao_repositorio");

describe(
    "Test SessaoUsuarioModel",
    () => {
        test(
            "criarRegistroDeSessao",
            () => {
                return SessionDAO.criarRegistroDeSessao(
                    "jest@test.database.cric.com.br",
                    "token_autenticacao"
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        email: "jest@test.database.cric.com.br",
                                        token_autenticacao: "token_autenticacao"
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "validarTokenAutenticacao",
            () => {
                return SessionDAO.validarTokenAutenticacao(
                    "token_autenticacao"
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        email: "jest@test.database.cric.com.br",
                                        token_autenticacao: "token_autenticacao"
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "validarTokenAutenticacao fails for attack",
            () => {
                return SessionDAO.validarTokenAutenticacao(
                    "attack"
                )
                    .then(
                        data => {
                            expect(data)
                                .toBeNull();
                        }
                    );
            }
        );
    }
);
