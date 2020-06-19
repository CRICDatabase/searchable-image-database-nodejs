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
                            dt_aquisicao: "2020-01-01",
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
