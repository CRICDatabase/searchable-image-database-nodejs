"use strict";

jest.useFakeTimers();

let UserDOA = require("./usuario_repositorio");

const Criptografia = require("../utils/criptografia");

describe(
    "Test UsuarioBaseModel",
    () => {
        test(
            "obterUsuarioBasePorEmail for admin",
            () => {
                return UserDOA.obterUsuarioBasePorEmail(
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
                return UserDOA.obterUsuarioBasePorEmail(
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
                return UserDOA.obterUsuarioBasePorId(
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
                return UserDOA.obterUsuarioBasePorId(
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
            "obterUsuarioCompletoPorLogin for admin",
            () => {
                return UserDOA.obterUsuarioCompletoPorLogin(
                    "admin@test.database.cric.com.br",
                    Criptografia.criarCriptografiaMd5Utf8("123.456")
                )
                    .then(
                        data => {
                            /* obterUsuarioCompletoPorLogin uses raw SQL query,
                               so data.dataValues is undefined */
                            expect(data)
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
            "obterUsuarioCompletoPorLogin for cybercriminal",
            () => {
                return UserDOA.obterUsuarioBasePorEmail(
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
                return UserDOA.cadastrarUsuarioBase(
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

describe(
    "Test AnalistaModel",
    () => {
        test(
            "obterAnalistaPorId for 1",
            () => {
                return UserDOA.obterAnalistaPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        total_segmentacoes: 28,
                                        total_classificacoes: 2
                                    }
                                );
                        }
                    );
            }
        );
    }
);
