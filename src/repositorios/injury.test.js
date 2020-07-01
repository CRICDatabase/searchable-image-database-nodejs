"use strict";

jest.useFakeTimers();

let ImageDAO = require("./imagem_repositorio");

describe(
    "Test LesaoModel",
    () => {
        test(
            "cadastrarLesao",
            () => {
                return ImageDAO.cadastrarLesao(
                    {
                        nome: "Short",
                        detalhes: "Long",
                        grade: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: expect.any(Number),
                                        nome: "Short",
                                        detalhes: "Long",
                                        grade: 100
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "valid id for obterLesaoPorId",
            () => {
                return ImageDAO.obterLesaoPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        nome: expect.any(String),
                                        detalhes: expect.any(String),
                                        grade: expect.any(Number)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "invalid id for obterLesaoPorId",
            () => {
                return ImageDAO.obterLesaoPorId(
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
                return ImageDAO.listarLesoes()
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
                                            detalhes: expect.any(String),
                                            grade: expect.any(Number)
                                        }]
                                    )
                                );
                        }
                    );
            }
        );
    }
);
