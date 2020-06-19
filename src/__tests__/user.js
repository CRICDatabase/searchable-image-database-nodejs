const request = require("supertest");
const app = require("../app");

let admin_token;

beforeAll(() => {
    return request(app)
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
