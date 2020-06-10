"use strict";

jest.useFakeTimers();

let ImageDOA = require("./imagem_repositorio");

describe(
    "Test DescricaoModel",
    () => {
        test(
            "cadastrarDescricao",
            () => {
                return ImageDOA.cadastrarDescricao(
                    {
                        codigo: 1000,
                        nome: "Description"
                    }
                )
                    .then(
                        data => {
                            expect(data)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        codigo: 1000,
                                        nome: "Description"
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "valid id for obterDescricaoPorId",
            () => {
                return ImageDOA.obterDescricaoPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        codigo: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "invalid id for obterDescricaoPorId",
            () => {
                return ImageDOA.obterDescricaoPorId(
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
            "listarDescricoes",
            () => {
                return ImageDOA.listarDescricoes()
                    .then(
                        data => {
                            expect(data)
                                .toMatchObject(
                                    expect.arrayContaining(
                                        [{
                                            id: expect.any(Number),
                                            codigo: expect.any(Number),
                                            nome: expect.any(String)
                                        }]
                                    )
                                );
                        }
                    );
            }
        );

    }
);
