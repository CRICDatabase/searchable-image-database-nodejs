const request = require("supertest");
const app = require("../app");

let admin_token;
let charles_token;

beforeAll(async () => {
    await request(app)
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

    await request(app)
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
    "POST /api/v1/imagens",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .post("/api/v1/imagens")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 2})
                    .field({codigo_lamina: "JEST Charles"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(201);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    caminho_imagem: expect.any(String),
                                    classificacao_aprovada: 0,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 0,
                                    id: expect.any(Number),
                                    id_usuario: 2,
                                    id_lesao: 1,
                                    largura: expect.any(Number),
                                    nome: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .attach("files", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 1})
                    .field({codigo_lamina: "JEST Admin"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(201);
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
                                        nome: expect.any(String),
                                        grade: expect.any(Number)
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
    "POST /api/v1/imagens/1/classificacao-celula/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens/1/classificacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens/1/segmentacao-celula/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens/1/segmentacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens-lesoes/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens-descricoes/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens-descricoes/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens-descricoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [{
                            codigo: 1,
                            nome: "Bar"
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(201);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        codigo: 1,
                                        nome: "Bar",
                                        id: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens-descricoes/1 (missing codigo)",
    () => {
        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens-descricoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [{
                            nome: "Bar"
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens-descricoes/1 (missing nome)",
    () => {
        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens-descricoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [{
                            codigo: 1
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(201);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        codigo: 1,
                                        nome: "Bar",
                                        id: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "GET /api/v1/imagens/listar/1",
    () => {
        test(
            "anonymous",
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
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
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
            "charles",
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
                                        classificacao_aprovada: expect.any(Number),
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
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
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
            "admin",
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
                                        classificacao_aprovada: expect.any(Number),
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
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
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

    }
);

describe(
    "GET /api/v1/imagens/listar/2",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should not be able to list imagem from users */
                return request(app)
                    .get("/api/v1/imagens/listar/2")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "charles",
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
                                        classificacao_aprovada: 0,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 0,
                                        id: expect.any(Number),
                                        id_usuario: 2,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
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
            "admin",
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
                                        classificacao_aprovada: 0,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: 0,
                                        fonte_aquisicao: 0,
                                        id: expect.any(Number),
                                        id_usuario: 2,
                                        largura: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
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

    }
);

describe(
    "GET /api/v1/imagens/1",
    () => {
        test(
            "anonymous",
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
            "charles",
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
            "admin",
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
                                    id: 1,
                                    id_usuario: 1,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String),
                                        grade: expect.any(Number)
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
    "GET /api/v1/imagens/3",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should not be able to get information of imagem from user */
                return request(app)
                    .get("/api/v1/imagens/3")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .get("/api/v1/imagens/3")
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
                                    classificacao_aprovada: 0,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 1,
                                    id: 3,
                                    id_usuario: 2,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String),
                                        grade: expect.any(Number)
                                    },
                                    nome: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/imagens/3")
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
                                    classificacao_aprovada: 0,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: 0,
                                    fonte_aquisicao: 1,
                                    id: 3,
                                    id_usuario: 2,
                                    largura: expect.any(Number),
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String),
                                        grade: expect.any(Number)
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
    "GET /api/v1/imagens-descricoes",
    () => {
        test(
            "anonymous",
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
                                        id: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user should be able to get information from description */
                return request(app)
                    .get("/api/v1/imagens-descricoes")
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
                                        codigo: expect.any(Number),
                                        nome: expect.any(String),
                                        id: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "GET /api/v1/imagens/contagem/lesoes/descricoes",
    () => {
        test(
            "anonymous",
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
                                    Normal: expect.any(Number)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user should be able to get information of imagem own by main user */
                return request(app)
                    .get("/api/v1/imagens/contagem/lesoes/descricoes")
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
                                    AscH: expect.any(Number),
                                    AscUs: expect.any(Number),
                                    Carcinoma: expect.any(Number),
                                    HSil: expect.any(Number),
                                    LSil: expect.any(Number),
                                    Normal: expect.any(Number)
                                }
                            );
                        }
                    );
            }
        );


    }
);

describe(
    "GET /api/v1/imagens/1/listar-classificacao-celula/1",
    () => {
        test(
            "anonymous",
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
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
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
            "admin",
            () => {
                /* Admin user should be able to get information of classification own by main user */
                return request(app)
                    .get("/api/v1/imagens/1/listar-classificacao-celula/1")
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
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number),
                                        id_celula: expect.any(Number),
                                        id_classificacao: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
                                        },
                                        tipo_analise_realizada: expect.any(String)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "GET /api/v1/imagens/3/listar-classificacao-celula/2",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should NOT be able to get information of classification own by other users */
                return request(app)
                    .get("/api/v1/imagens/3/listar-classificacao-celula/2")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user should be able to get information of classification own by other users */
                return request(app)
                    .get("/api/v1/imagens/3/listar-classificacao-celula/2")
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
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number),
                                        id_celula: expect.any(Number),
                                        id_classificacao: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        lesao: {
                                            detalhes: expect.any(String),
                                            id: expect.any(Number),
                                            nome: expect.any(String),
                                            grade: expect.any(Number)
                                        },
                                        tipo_analise_realizada: expect.any(String)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "GET /api/v1/imagens/1/listar-segmentacao-celula/1",
    () => {
        test(
            "anonymous",
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
                                                nome: expect.any(String)
                                            },
                                            id: expect.any(Number),
                                            segmentos_citoplasma: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number)
                                                }]
                                            ),
                                            segmentos_nucleo: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number)
                                                }]
                                            ),
                                            tipo_analise_realizada: expect.any(String)
                                        }]
                                    )
                                }
                            );
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user should be able to get information of segmentacao own by main user */
                return request(app)
                    .get("/api/v1/imagens/1/listar-segmentacao-celula/1")
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
                                    celulas: expect.arrayContaining(
                                        [{
                                            descricao: {
                                                codigo: expect.any(Number),
                                                id: expect.any(Number),
                                                nome: expect.any(String)
                                            },
                                            id: expect.any(Number),
                                            segmentos_citoplasma: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number)
                                                }]
                                            ),
                                            segmentos_nucleo: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number)
                                                }]
                                            ),
                                            tipo_analise_realizada: expect.any(String)
                                        }]
                                    )
                                }
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "GET /api/v1/imagens/3/listar-segmentacao-celula/2",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should NOT be able to get information of segmentacao own by other users */
                return request(app)
                    .get("/api/v1/imagens/3/listar-segmentacao-celula/2")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user should be able to get information of segmentacao own by other users */
                return request(app)
                    .get("/api/v1/imagens/3/listar-segmentacao-celula/2")
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
                                    celulas: expect.arrayContaining(
                                        [{
                                            descricao: {
                                                codigo: expect.any(Number),
                                                id: expect.any(Number),
                                                nome: expect.any(String)
                                            },
                                            id: expect.any(Number),
                                            segmentos_citoplasma: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number)
                                                }]
                                            ),
                                            segmentos_nucleo: expect.arrayContaining(
                                                [{
                                                    coord_x: expect.any(Number),
                                                    coord_y: expect.any(Number)
                                                }]
                                            ),
                                            tipo_analise_realizada: expect.any(String)
                                        }]
                                    )
                                }
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "GET /api/v1/imagens/download",
    () => {
        test(
            "anonymous",
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
            "admin",
            () => {
                /* Admin user should be able to get zip file */
                return request(app)
                    .get("/api/v1/imagens/download")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                        }
                    );
            }
        );

    }
);

describe(
    "PUT /api/v1/imagens/1/atualizar/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/atualizar/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/atualizar/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                        }
                    );
            }
        );

    }
);

describe(
    "DELETE /api/v1/imagens/1/classificacao-celula/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/1/classificacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/1/classificacao-celula/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(204);
                        }
                    );
            }
        );

    }
);

describe(
    "DELETE /api/v1/imagens/1/segmentacao-celula/4",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/1/segmentacao-celula/4")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/1/segmentacao-celula/4")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(204);
                        }
                    );
            }
        );

    }
);
