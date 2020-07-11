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
    "GET /api/v1/usuarios",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/usuarios")
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
                    .get("/api/v1/usuarios")
                    .set(
                        "Authorization",
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

        test(
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/usuarios")
                    .set(
                        "Authorization",
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

describe(
    "GET /api/v1/usuarios/1",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/1")
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
    "POST /api/v1/usuarios/",
    () => {
        test(
            "anonymous",
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
