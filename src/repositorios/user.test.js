"use strict";

jest.useFakeTimers();

const proxyquire = require("proxyquire");
const SequelizeMock = require("sequelize-mock");

const UsuarioBaseFixtures = require("../fixtures/user");
const AnalistaFixtures = require("../fixtures/analyst");

const dbMock = new SequelizeMock();

const MockUsuarioBaseModel = dbMock.define("usuario_base");
MockUsuarioBaseModel.$queueResult(
    UsuarioBaseFixtures.fixtures.map(
        (element) => {
            return MockUsuarioBaseModel.build(
                element
            );
        }
    )    
);

const MockAnalistaModel = dbMock.define("analista");
MockAnalistaModel.$queueResult(
    AnalistaFixtures.fixtures.map(
        (element) => {
            return MockAnalistaModel.build(
                element
            );
        }
    )    
);

const UserDOA = proxyquire(
    "./usuario_repositorio",
    {
        "src/models/UsuarioBaseModel": MockUsuarioBaseModel,
        "src/models/AnalistaModel": MockAnalistaModel,
        "src/database": dbMock
    }
);

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
                            expect(data)
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
                            expect(data)
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