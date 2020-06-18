"use strict";

jest.useFakeTimers();

let UserDAO = require("./usuario_repositorio");

const Criptografia = require("../utils/criptografia");

describe(
    "Test UsuarioBaseModel",
    () => {
        test(
            "obterUsuarioBasePorEmail for admin",
            () => {
                return UserDAO.obterUsuarioBasePorEmail(
                    "admin@test.database.cric.com.br"
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        primeiro_nome: "admin",
                                        ultimo_nome: "",
                                        email: "admin@test.database.cric.com.br",
                                        ativo: 1
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "obterUsuarioBasePorEmail for cybercriminal",
            () => {
                return UserDAO.obterUsuarioBasePorEmail(
                    "cybercriminal@test.database.cric.com.br"
                )
                    .then(
                        data => {
                            expect(data)
                                .toBeNull();
                        }
                    );
            }
        );

        test(
            "obterUsuarioBasePorId for 1",
            () => {
                return UserDAO.obterUsuarioBasePorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        primeiro_nome: "admin",
                                        ultimo_nome: "",
                                        email: "admin@test.database.cric.com.br",
                                        ativo: 1
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "obterUsuarioBasePorId for 1000",
            () => {
                return UserDAO.obterUsuarioBasePorId(
                    1000
                )
                    .then(
                        data => {
                            expect(data)
                                .toBeNull();
                        }
                    );
            }
        );

        test(
            "obterUsuarioCompletoPorLogin for cybercriminal",
            () => {
                return UserDAO.obterUsuarioBasePorEmail(
                    "cybercriminal@test.database.cric.com.br"
                )
                    .then(
                        data => {
                            expect(data)
                                .toBeNull();
                        }
                    );
            }
        );

        test(
            "cadastrarUsuarioBase",
            () => {
                return UserDAO.cadastrarUsuarioBase(
                    {
                        primeiro_nome: "jest",
                        ultimo_nome: "",
                        email: "jest@test.database.cric.com.br"
                    },
                    "123.456",
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        primeiro_nome: "jest",
                                        ultimo_nome: "",
                                        email: "jest@test.database.cric.com.br",
                                        ativo: 1
                                    }
                                );
                        }
                    );
            }
        );
    }
);
