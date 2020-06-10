"use strict";

jest.useFakeTimers();

let ImageDOA = require("./imagem_repositorio");

describe(
    "Test LesaoModel",
    () => {
        test(
            "cadastrarLesao",
            () => {
                return ImageDOA.cadastrarLesao(
                    {
                        nome: "Short",
                        detalhes: "Long"
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        nome: "Short",
                                        detalhes: "Long"
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "valid id for obterLesaoPorId",
            () => {
                return ImageDOA.obterLesaoPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        nome: expect.any(String),
                                        detalhes: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "invalid id for obterLesaoPorId",
            () => {
                return ImageDOA.obterLesaoPorId(
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
            "listarLesoes",
            () => {
                return ImageDOA.listarLesoes()
                    .then(
                        data => {
                            expect(data.map(
                                item => {
                                    return item.dataValues;
                                }
                            ))
                                .toMatchObject(
                                    expect.arrayContaining(
                                        [{
                                            id: expect.any(Number),
                                            nome: expect.any(String),
                                            detalhes: expect.any(String)
                                        }]
                                    )
                                );
                        }
                    );
            }
        );
    }
);
