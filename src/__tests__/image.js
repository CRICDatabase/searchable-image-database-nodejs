const HttpStatus = require("http-status-codes");

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
                admin_token = response.body.Authorization;
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
                charles_token = response.body.Authorization;
            }
        );
});

describe(
    "GET /api/v1/imagens (no id_usuario)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should be able to list imagem from main user */
                return request(app)
                    .get("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: true,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: false,
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
                    .get("/api/v1/imagens")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: false,
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
                    .get("/api/v1/imagens")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: false,
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
    "GET /api/v1/imagens (id_usuario=1)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should be able to list imagem from main user */
                return request(app)
                    .get("/api/v1/imagens")
                    .query("id_usuario=1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: true,
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: false,
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
                    .get("/api/v1/imagens")
                    .query("id_usuario=1")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: false,
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
                    .get("/api/v1/imagens")
                    .query("id_usuario=1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: expect.any(Boolean),
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
    "GET /api/v1/imagens (id_usuario=2)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/imagens")
                    .query("id_usuario=2")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toEqual(
                                []
                            );
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .get("/api/v1/imagens")
                    .query("id_usuario=2")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: false,
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
                    .get("/api/v1/imagens")
                    .query("id_usuario=2")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        dt_aquisicao: expect.any(String),
                                        excluida: expect.any(Boolean),
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
    "GET /api/v1/imagens (id_usuario=3)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/imagens")
                    .query("id_usuario=3")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toEqual(
                                []
                            );
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .get("/api/v1/imagens")
                    .query("id_usuario=3")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toEqual(
                                []
                            );
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/imagens")
                    .query("id_usuario=3")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toEqual(
                                []
                            );
                        }
                    );
            }
        );

    }
);


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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 2})
                    .field({codigo_lamina: "JEST Charles"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: false,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: expect.any(Number),
                                    // id_usuario: 2,
                                    lesao: {
                                        detalhes: expect.any(String),
                                        id: expect.any(Number),
                                        nome: expect.any(String),
                                        grade: expect.any(Number)
                                    },
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
                        "Authorization",
                        admin_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 1})
                    .field({codigo_lamina: "JEST Admin"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: false,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: expect.any(Number),
                                    // id_usuario: 1,
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
    "POST /api/v1/imagens (missing file)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .field({id_usuario: 2})
                    .field({codigo_lamina: "JEST Charles"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
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
                        "Authorization",
                        admin_token
                    )
                    .field({id_usuario: 1})
                    .field({codigo_lamina: "JEST Admin"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens (missing id_usuario)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({codigo_lamina: "JEST Charles"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
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
                        "Authorization",
                        admin_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({codigo_lamina: "JEST Admin"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens (wrong id_usuario)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 1})
                    .field({codigo_lamina: "JEST Charles"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
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
                        "Authorization",
                        admin_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 2})
                    .field({codigo_lamina: "JEST Admin"})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: false,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: expect.any(Number),
                                    // id_usuario: 1,
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
    "POST /api/v1/imagens (missing codigo_lamina)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 2})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
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
                        "Authorization",
                        admin_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 1})
                    .field({dt_aquisicao: "2020-01-01"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/imagens (missing dt_aquisicao)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/imagens")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 2})
                    .field({codigo_lamina: "JEST Charles"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
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
                        "Authorization",
                        admin_token
                    )
                    .attach("file", "src/__tests__/example0006.jpg")
                    .field({id_usuario: 1})
                    .field({codigo_lamina: "JEST Admin"})
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
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
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: true,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: 1,
                                    // id_usuario: 1,
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
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: true,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: 1,
                                    // id_usuario: 1,
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: true,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: 1,
                                    // id_usuario: 1,
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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: false,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: 3,
                                    // id_usuario: 2,
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    altura: expect.any(Number),
                                    classificacao_aprovada: false,
                                    codigo_lamina: expect.any(String),
                                    dt_aquisicao: expect.any(String),
                                    excluida: false,
                                    id: 3,
                                    // id_usuario: 2,
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
    "GET /api/v1/imagens/100 (invalid id)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should not be able to get information of imagem from user */
                return request(app)
                    .get("/api/v1/imagens/100")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .get("/api/v1/imagens/100")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/imagens/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );

            }
        );
    }
);

describe(
    "PUT /api/v1/imagens/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1")
                    .send(
                        {
                            codigo_lamina: "Anonymous code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* User can only use PUT method in image they own */
                return request(app)
                    .put("/api/v1/imagens/1")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            codigo_lamina: "Charles's code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            codigo_lamina: "Admin's code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "PUT /api/v1/imagens/3",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/3")
                    .send(
                        {
                            codigo_lamina: "Anonymous' code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* User can only use PUT method in image they own */
                return request(app)
                    .put("/api/v1/imagens/3")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            codigo_lamina: "Charles's code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/3")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            codigo_lamina: "Admin's code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "PUT /api/v1/imagens/100 (invalid ID)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/100")
                    .send(
                        {
                            codigo_lamina: "Anonymous' code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .put("/api/v1/imagens/100")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            codigo_lamina: "Charles's code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .put("/api/v1/imagens/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            codigo_lamina: "Admin's code",
                            dt_aquisicao: "2021-01-01"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );
    }
);


describe(
    "DELETE /api/v1/imagens/6 (own by admin)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .delete("/api/v1/imagens/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* User can only use PUT method in image they own */
                return request(app)
                    .delete("/api/v1/imagens/6")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    delete("/api/v1/imagens/6")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "DELETE /api/v1/imagens/7 (own by Charles)",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .delete("/api/v1/imagens/7")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* User can only use PUT method in image they own */
                return request(app)
                    .delete("/api/v1/imagens/7")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        // No test with admin because image was removed
    }
);

describe(
    "DELETE /api/v1/imagens/8 (own by Charles)",
    () => {
        // No test with anonymous or Charles because was tested image #7
        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .delete("/api/v1/imagens/8")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "POST /api/v1/imagens/9/aprovada",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .post("/api/v1/imagens/9/aprovada")
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .post("/api/v1/imagens/9/aprovada")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens/9/aprovada")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "POST /api/v1/imagens/foo/aprovada (bad request)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .post("/api/v1/imagens/foo/aprovada")
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .post("/api/v1/imagens/foo/aprovada")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens/foo/aprovada")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );
    }
);

describe(
    "POST /api/v1/imagens/100/aprovada (not found)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .post("/api/v1/imagens/100/aprovada")
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .post("/api/v1/imagens/100/aprovada")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens/100/aprovada")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send()
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );
    }
);


describe(
    "DELETE /api/v1/imagens/10/aprovada",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/10/aprovada")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/10/aprovada")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/10/aprovada")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "DELETE /api/v1/imagens/foo/aprovada (bad request)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/foo/aprovada")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/foo/aprovada")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/foo/aprovada")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
                        }
                    );
            }
        );
    }
);

describe(
    "DELETE /api/v1/imagens/100/aprovada (not found)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/100/aprovada")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/10/aprovada")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/10/aprovada")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        id: expect.any(Number),
                                        id_imagem: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number)
                                        // lesao: {
                                        //     detalhes: expect.any(String),
                                        //     id: expect.any(Number),
                                        //     nome: expect.any(String),
                                        //     grade: expect.any(Number)
                                        // }
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        id: expect.any(Number),
                                        id_imagem: expect.any(Number),
                                        id_lesao:expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number)
                                        // lesao: {
                                        //     detalhes: expect.any(String),
                                        //     id: expect.any(Number),
                                        //     nome: expect.any(String),
                                        //     grade: expect.any(Number)
                                        // }
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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* Owner should be able to get information of classification */
                return request(app)
                    .get("/api/v1/imagens/3/listar-classificacao-celula/2")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        id: expect.any(Number),
                                        id_imagem: expect.any(Number),
                                        id_lesao:expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number)
                                        // lesao: {
                                        //     detalhes: expect.any(String),
                                        //     id: expect.any(Number),
                                        //     nome: expect.any(String),
                                        //     grade: expect.any(Number)
                                        // }
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
                /* Admin user should be able to get information of classification own by other users */
                return request(app)
                    .get("/api/v1/imagens/3/listar-classificacao-celula/2")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        id: expect.any(Number),
                                        id_imagem: expect.any(Number),
                                        id_lesao:expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        coord_centro_nucleo_x: expect.any(Number),
                                        coord_centro_nucleo_y: expect.any(Number)
                                        // lesao: {
                                        //     detalhes: expect.any(String),
                                        //     id: expect.any(Number),
                                        //     nome: expect.any(String),
                                        //     grade: expect.any(Number)
                                        // }
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
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
                                            )
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
                                            )
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
    "GET /api/v1/imagens/1/listar-segmentacao-celula/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should NOT be able to get information of segmentacao own by other users */
                return request(app)
                    .get("/api/v1/imagens/1/listar-segmentacao-celula/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
                                            )
                                        }]
                                    )
                                }
                            );
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* Admin user should be able to get information of segmentacao own by other users */
                return request(app)
                    .get("/api/v1/imagens/1/listar-segmentacao-celula/1")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
                                            )
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
                /* Admin user should be able to get information of segmentacao own by other users */
                return request(app)
                    .get("/api/v1/imagens/1/listar-segmentacao-celula/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
                                            )
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
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                        }
                    );
            }
        );

    }
);

describe(
    "PUT /api/v1/imagens/1/classificacao-celula/1",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/classificacao-celula/1")
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/classificacao-celula/1")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/classificacao-celula/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "PUT /api/v1/imagens/3/classificacao-celula/3",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/3/classificacao-celula/3")
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/3/classificacao-celula/3")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                /* Admin user can use PUT method */
                return request(app)
                    .put("/api/v1/imagens/3/classificacao-celula/3")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );
    }
);

describe(
    "PUT /api/v1/imagens/1/classificacao-celula/100",
    () => {

        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use PUT method */
                return request(app)
                    .put("/api/v1/imagens/1/classificacao-celula/100")
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .put("/api/v1/imagens/1/classificacao-celula/100")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .put("/api/v1/imagens/1/classificacao-celula/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            id_lesao_celula: 1
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* User NOT use DELETE cell from image that they don't own */
                return request(app)
                    .delete("/api/v1/imagens/1/classificacao-celula/1")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );

    }
);


describe(
    "DELETE /api/v1/imagens/3/classificacao-celula/3",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user can NOT use DELETE method */
                return request(app)
                    .delete("/api/v1/imagens/3/classificacao-celula/31")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                return request(app)
                    .delete("/api/v1/imagens/3/classificacao-celula/3")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "charles",
            () => {
                /* User can NOT use DELETE segmentation in image they don't own */
                return request(app)
                    .delete("/api/v1/imagens/1/segmentacao-celula/4")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
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
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
                        }
                    );
            }
        );

    }
);
