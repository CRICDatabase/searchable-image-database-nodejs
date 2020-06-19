"use strict";

jest.useFakeTimers();

let ImageDAO = require("./imagem_repositorio");

describe(
    "Test ImagemModel",
    () => {
        test(
            "cadastrarImagem without DOI for admin",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest without DOI",
                        codigo_lamina: "jest without DOI",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        fonte_aquisicao: 1,
                        caminho_imagem: "imagens/fixtures/",
                        id_usuario: 1,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: expect.any(Number),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Number),
                                        fonte_aquisicao: expect.any(Number),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "cadastrarImagem with DOI for admin",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest with DOI",
                        codigo_lamina: "jest with DOI",
                        doi: "cric/jest.admin.1.v1",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        fonte_aquisicao: 1,
                        caminho_imagem: "imagens/fixtures/",
                        id_usuario: 1,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: expect.any(Number),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Number),
                                        fonte_aquisicao: expect.any(Number),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "cadastrarImagem without DOI for Charles",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest without DOI",
                        codigo_lamina: "jest without DOI",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        fonte_aquisicao: 1,
                        caminho_imagem: "imagens/fixtures/",
                        id_usuario: 2,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: expect.any(Number),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Number),
                                        fonte_aquisicao: expect.any(Number),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "cadastrarImagem with DOI for Charles",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest without DOI",
                        codigo_lamina: "jest without DOI",
                        doi: "cric/jest.charles.1.v1",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        fonte_aquisicao: 1,
                        caminho_imagem: "imagens/fixtures/",
                        id_usuario: 2,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: expect.any(Number),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Number),
                                        fonte_aquisicao: expect.any(Number),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "valid id for obterImagemPorId",
            () => {
                return ImageDAO.obterImagemPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: expect.any(Number),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Number),
                                        fonte_aquisicao: expect.any(Number),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "invalid id for obterImagemPorId",
            () => {
                return ImageDAO.obterImagemPorId(
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
            "listarImagens",
            () => {
                return ImageDAO.listarImagens()
                    .then(
                        data => {
                            expect(data.map(
                                item => {
                                    return item.dataValues;
                                }
                            ))
                                .toEqual(
                                    expect.arrayContaining(
                                        [
                                            expect.objectContaining({
                                                altura: expect.any(Number),
                                                caminho_imagem: expect.any(String),
                                                classificacao_aprovada: expect.any(Number),
                                                codigo_lamina: expect.any(String),
                                                // doi: expect.any(String),
                                                dt_aquisicao: expect.any(Date),
                                                excluida: expect.any(Number),
                                                fonte_aquisicao: expect.any(Number),
                                                id: expect.any(Number),
                                                id_lesao: expect.any(Number),
                                                id_usuario: expect.any(Number),
                                                largura: expect.any(Number),
                                                nome: expect.any(String)
                                            })
                                        ]
                                    )
                                );
                        }
                    );
            }
        );

    }
);
