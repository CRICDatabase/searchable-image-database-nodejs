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
                    "Authorization"
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        email: "jest@test.database.cric.com.br",
                                        Authorization: "Authorization"
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
                    "Authorization"
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        email: "jest@test.database.cric.com.br",
                                        Authorization: "Authorization"
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
