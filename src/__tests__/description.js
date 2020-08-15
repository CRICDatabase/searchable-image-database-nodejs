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
    "POST /api/v1/descricoes",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .post("/api/v1/descricoes")
                    .send(
                        [{
                            codigo: 1,
                            nome: "Bar"
                        }]
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
                    .post("/api/v1/descricoes")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        [{
                            codigo: 1,
                            nome: "Bar"
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/descricoes")
                    .set(
                        "Authorization",
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
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
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
    "POST /api/v1/descricoes (missing codigo)",
    () => {
        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/descricoes")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        [{
                            nome: "Bar"
                        }]
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
    "POST /api/v1/descricoes (missing nome)",
    () => {
        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/descricoes")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        [{
                            codigo: 1
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
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
    "GET /api/v1/descricoes",
    () => {
        test(
            "anonymous",
            () => {
                /* Anonymous user should be able to get information from description */
                return request(app)
                    .get("/api/v1/descricoes")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
            "charles",
            () => {
                /* Admin user should be able to get information from description */
                return request(app)
                    .get("/api/v1/descricoes")
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
                    .get("/api/v1/descricoes")
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

// TODO Remove from here in v2

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
                            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
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
                        "Authorization",
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
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
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
                        "Authorization",
                        admin_token
                    )
                    .send(
                        [{
                            nome: "Bar"
                        }]
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
    "POST /api/v1/imagens-descricoes/1 (missing nome)",
    () => {
        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens-descricoes/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        [{
                            codigo: 1
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
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
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
