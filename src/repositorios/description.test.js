"use strict";

jest.useFakeTimers();

let ImageDAO = require("./imagem_repositorio");

describe(
    "Test DescricaoModel",
    () => {
        test(
            "cadastrarDescricao",
            () => {
                return ImageDAO.cadastrarDescricao(
                    {
                        codigo: 1000,
                        nome: "Description"
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
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
                return ImageDAO.obterDescricaoPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
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
                return ImageDAO.obterDescricaoPorId(
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
                return ImageDAO.listarDescricoes()
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
