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
    "annonymous /api/v1/usuarios",
    () => {
        test(
            "GET /api/v1/usuarios",
            () => {
                return request(app)
                    .get("/api/v1/usuarios")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "GET /api/v1/usuarios/1",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "POST /api/v1/usuarios/",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/")
                    .send(
                        {
                            primeiro_nome: "Created by annonymous",
                            ultimo_nome: "",
                            email: "create.by.annonymous@test.database.cric.com.br",
                            senha: "123.456"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(201);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    id: expect.any(Number),
                                    primeiro_nome: "Created by annonymous",
                                    ultimo_nome: "",
                                    email: "create.by.annonymous@test.database.cric.com.br",
                                    senha: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );
    }
);

describe(
    "user /api/v1/usuarios",
    () => {
        test(
            "GET /api/v1/usuarios",
            () => {
                return request(app)
                    .get("/api/v1/usuarios")
                    .set(
                        "token_autenticacao",
                        charles_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toEqual(
                                expect.arrayContaining(
                                    [
                                        expect.objectContaining({
                                            ativo: true,
                                            email: expect.any(String),
                                            id: expect.any(Number),
                                            primeiro_nome: expect.any(String),
                                            senha: expect.any(String),
                                            ultimo_nome: expect.any(String)
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


describe(
    "admin /api/v1/usuarios",
    () => {
        test(
            "GET /api/v1/usuarios",
            () => {
                return request(app)
                    .get("/api/v1/usuarios")
                    .set(
                        "token_autenticacao",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toEqual(
                                expect.arrayContaining(
                                    [
                                        expect.objectContaining({
                                            ativo: true,
                                            email: expect.any(String),
                                            id: expect.any(Number),
                                            primeiro_nome: expect.any(String),
                                            senha: expect.any(String),
                                            ultimo_nome: expect.any(String)
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
