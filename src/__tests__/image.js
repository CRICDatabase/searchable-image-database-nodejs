const request = require("supertest");
const app = require("../app");

let admin_token;
let charles_token;

beforeAll(() => {
    request(app)
        .post(
            "/api/v1/login"
        )
        .send(
            {
                email: "admin@test.database.cric.com.br",
                senha: "123.456"
            }
        )
        .then(
            (response) => {
                admin_token = response.body.token_autenticacao;
            }
        );

    request(app)
        .post(
            "/api/v1/login"
        )
        .send(
            {
                email: "charles@test.database.cric.com.br",
                senha: "123.456"
            }
        )
        .then(
            (response) => {
                charles_token = response.body.token_autenticacao;
            }
        );
});

describe(
    "annonymous /api/v1/imagens",
    () => {
        test(
            "POST /api/v1/imagens",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "POST /api/v1/imagens/1/classificacao-celula/1",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens/1/classificacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "POST /api/v1/imagens/1/segmentacao-celula/1",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens/1/segmentacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "POST /api/v1/imagens-lesoes/1",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "POST /api/v1/imagens-descricoes/1",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens-descricoes/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );
        
        test(
            "GET /api/v1/imagens/listar/1",
            () => {
                /* Anonymous user should be able to list imagem from main user */
                return request(app)
                    .get("/api/v1/imagens/listar/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: 1,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 1,
                                        id: expect.any(Number),
                                        id_usuario: 1,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String)
                                        },
                                        nome: expect.any(String),
                                        total_classificacoes: expect.any(Number),
                                        total_segmentacoes: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/listar/2",
            () => {
                /* Anonymous user should not be able to list imagem from users */
                return request(app)
                    .get("/api/v1/imagens/listar/2")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1",
            () => {
                /* Anonymous user should be able to get information of imagem own by main user */
                return request(app)
                    .get("/api/v1/imagens/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    caminho_imagem: expect.any(String),
                                    classificacao_aprovada: 1,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 1,
                                    id: 1,
                                    id_usuario: 1,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String)
                                    },
                                    nome: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/3",
            () => {
                /* Anonymous user should not be able to get information of imagem from user */
                return request(app)
                    .get("/api/v1/imagens/3")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens-lesoes",
            () => {
                /* Anonymous user should be able to get information from injury */
                return request(app)
                    .get("/api/v1/imagens-lesoes")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        detalhes: expect.any(String),
                                        nome: expect.any(String),
                                        id: expect.any(Number),
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens-descricoes",
            () => {
                /* Anonymous user should be able to get information from description */
                return request(app)
                    .get("/api/v1/imagens-descricoes")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        codigo: expect.any(Number),
                                        nome: expect.any(String),
                                        id: expect.any(Number),
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/contagem/lesoes/descricoes",
            () => {
                /* Anonymous user should be able to get information of imagem own by main user */
                return request(app)
                    .get("/api/v1/imagens/contagem/lesoes/descricoes")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    AscH: expect.any(Number),
                                    AscUs: expect.any(Number),
                                    Carcinoma: expect.any(Number),
                                    HSil: expect.any(Number),
                                    LSil: expect.any(Number),
                                    Normal: expect.any(Number),
                                }
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1/listar-classificacao-celula/1",
            () => {
                /* Anonymous user should be able to get information of classification own by main user */
                return request(app)
                    .get("/api/v1/imagens/1/listar-classificacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number),
                                        id_celula: expect.any(Number),
                                        id_classificacao: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String)
                                        },
                                        tipo_analise_realizada: expect.any(String)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1/listar-classificacao-celula/2",
            () => {
                /* Anonymous user should NOT be able to get information of classification own by other users */
                return request(app)
                    .get("/api/v1/imagens/1/listar-classificacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1/listar-segmentacao-celula/1",
            () => {
                /* Anonymous user should be able to get information of segmentacao own by main user */
                return request(app)
                    .get("/api/v1/imagens/1/listar-segmentacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    celulas: expect.arrayContaining(
                                        [{
                                            descricao: {
                                                codigo: expect.any(Number),
                                                id: expect.any(Number),
                                                nome: expect.any(String),
                                            },
                                            id: expect.any(Number),
                                            segmentos_citoplasma: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number),
                                                }]
                                            ),
                                            segmentos_nucleo: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number),
                                                }]
                                            ),
                                            tipo_analise_realizada: expect.any(String),
                                        }]
                                    ),
                                }
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1/listar-segmentacao-celula/2",
            () => {
                /* Anonymous user should NOT be able to get information of segmentacao own by other users */
                return request(app)
                    .get("/api/v1/imagens/1/listar-segmentacao-celula/2")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/download",
            () => {
                /* Anonymous user should be able to get zip file */
                return request(app)
                    .get("/api/v1/imagens/download")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                        }
                    );
            }
        );

        test(
            "PUT /api/v1/imagens/1/atualizar/1",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/atualizar/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "DELETE /api/v1/imagens/1/classificacao-celula/1/usuario/1",
            () => {
                /* Anonymous user can NOT use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/1/classificacao-celula/1/usuario/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "DELETE /api/v1/imagens/1/segmentacao-celula/1/usuario/1",
            () => {
                /* Anonymous user can NOT use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/1/segmentacao-celula/1/usuario/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );
    }
);

describe(
    "user /api/v1/imagens",
    () => {
        test(
            "GET /api/v1/imagens/listar/1",
            () => {
                return request(app)
                    .get("/api/v1/imagens/listar/1")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: 1,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 1,
                                        id: expect.any(Number),
                                        id_usuario: 1,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String)
                                        },
                                        nome: expect.any(String),
                                        total_classificacoes: expect.any(Number),
                                        total_segmentacoes: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/listar/2",
            () => {
                return request(app)
                    .get("/api/v1/imagens/listar/2")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: 1,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 1,
                                        id: expect.any(Number),
                                        id_usuario: 1,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String)
                                        },
                                        nome: expect.any(String),
                                        total_classificacoes: expect.any(Number),
                                        total_segmentacoes: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1",
            () => {
                return request(app)
                    .get("/api/v1/imagens/1")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    caminho_imagem: expect.any(String),
                                    classificacao_aprovada: 1,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 1,
                                    id: expect.any(Number),
                                    id_usuario: 1,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String)
                                    },
                                    nome: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "POST /api/v1/imagens/",
            () => {
                return request(app)
                    .post("/api/v1/imagens")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
                    .attach("files", "src/__tests__/example0006.jpg")
                    .send(
                        {
                            id_usuario: 2,
                            id_lesao: 1,
                            codigo_lamina: "JEST Charles",
                            dt_aquisicao: "2020-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    caminho_imagem: expect.any(String),
                                    classificacao_aprovada: 1,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 1,
                                    id: expect.any(Number),
                                    id_usuario: 1,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String)
                                    },
                                    nome: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );
    }
);


describe(
    "admin /api/v1/imagens",
    () => {
        test(
            "GET /api/v1/imagens/listar/1",
            () => {
                return request(app)
                    .get("/api/v1/imagens/listar/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: 1,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 1,
                                        id: expect.any(Number),
                                        id_usuario: 1,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String)
                                        },
                                        nome: expect.any(String),
                                        total_classificacoes: expect.any(Number),
                                        total_segmentacoes: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/listar/2",
            () => {
                return request(app)
                    .get("/api/v1/imagens/listar/2")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        caminho_imagem: expect.any(String),
                                        classificacao_aprovada: 1,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 1,
                                        id: expect.any(Number),
                                        id_usuario: 1,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String)
                                        },
                                        nome: expect.any(String),
                                        total_classificacoes: expect.any(Number),
                                        total_segmentacoes: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "GET /api/v1/imagens/1",
            () => {
                return request(app)
                    .get("/api/v1/imagens/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    caminho_imagem: expect.any(String),
                                    classificacao_aprovada: 1,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 1,
                                    id: expect.any(Number),
                                    id_usuario: 1,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String)
                                    },
                                    nome: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );
    }
);
