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
    "annonymous /api/v1/imagens-lesoes",
    () => {
        test(
            "POST /api/v1/imagens-lesoes/1",
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
        
        test(
            "GET /api/v1/imagens-lesoes",
            () => {
                /* Anonymous user should be able to list injury */
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

describe(
    "user /api/v1/imagens-lesoes",
    () => {
        test(
            "POST /api/v1/imagens-lesoes/1",
            () => {
                /* User can NOT use POST method */
                console.log(charles_token);
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
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
                /* User should be able to list injury */
                return request(app)
                    .get("/api/v1/imagens-lesoes")
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


describe(
    "admin /api/v1/imagens-lesoes",
    () => {
        test(
            "POST /api/v1/imagens-lesoes/1",
            () => {
                /* Admin can use POST method */
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [
                            {
                                nome: "Test",
                                detalhes: "Test",
                                grade: 100
                            }
                        ]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(201);
                            expect(
                                response.body
                            ).toMatchObject(
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

        test(
            "missing detalhes for POST /api/v1/imagens-lesoes/1",
            () => {
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [{
                            nome: "Test",
                            grade: 100
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
                                        detalhes: expect.any(String),
                                        nome: expect.any(String),
                                        id: expect.any(Number),
                                        grade: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "missing nome for POST /api/v1/imagens-lesoes/1",
            () => {
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [{
                            detalhes: "Test",
                            grade: 100
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );
        
        test(
            "missing grade for POST /api/v1/imagens-lesoes/1",
            () => {
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .send(
                        [{
                            detalhes: "Test",
                            nome: "Test"
                        }]
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );
        
        test(
            "GET /api/v1/imagens-lesoes",
            () => {
                /* Admin should be able to list injury */
                return request(app)
                    .get("/api/v1/imagens-lesoes")
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
