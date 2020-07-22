const request = require("supertest");
const app = require("../app");

let admin_token;
let charles_token;
let amelia_token;

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

    await request(app)
        .post(
            "/api/v1/usuarios/login"
        )
        .send(
            {
                email: "amelia@test.database.cric.com.br",
                senha: "123.456"
            }
        )
        .then(
            (response) => {
                amelia_token = response.body.Authorization;
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
                            expect(response.statusCode).toBe(401);
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
                            expect(response.statusCode).toBe(403);
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
    "POST /api/v1/usuarios",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .post("/api/v1/usuarios")
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
    "GET /api/v1/usuarios/:id_usuario",
    () => {
        test(
            "username instead of user's id",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/charles")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "anonymous",
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
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    id: expect.any(Number),
                                    primeiro_nome: expect.any(String),
                                    ultimo_nome: expect.any(String),
                                    email: expect.any(String),
                                    senha: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "not found",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(404);
                        }
                    );
            }
        );
    }
);

describe(
    "PUT /api/v1/usuarios/:id_usuario",
    () => {
        test(
            "username instead of user's id",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/charles")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "anonymous",
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
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    id: expect.any(Number),
                                    primeiro_nome: expect.any(String),
                                    ultimo_nome: expect.any(String),
                                    email: expect.any(String),
                                    senha: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "not found",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(404);
                        }
                    );
            }
        );
    }
);

describe(
    "DELETE /api/v1/usuarios/:id_usuario",
    () => {
        test(
            "username instead of user's id",
            () => {
                return request(app)
                    .delete("/api/v1/usuarios/daniel")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "anonymous",
            () => {
                return request(app)
                    .delete("/api/v1/usuarios/8")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "admin",
            () => {
                return request(app)
                    .delete("/api/v1/usuarios/8")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    id: expect.any(Number),
                                    primeiro_nome: expect.any(String),
                                    ultimo_nome: expect.any(String),
                                    email: expect.any(String),
                                    senha: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );

        test(
            "not found",
            () => {
                return request(app)
                    .get("/api/v1/usuarios/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(404);
                        }
                    );
            }
        );
    }
);

describe(
    "POST /api/v1/usuarios/:id_usuario/admin",
    () => {
        test(
            "OK",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/6/admin")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send()
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
    "DELETE /api/v1/usuarios/id_usuario/admin",
    () => {
        test(
            "OK",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/7/admin")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send()
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
    "POST /api/v1/usuarios/logout",
    () => {
        test(
            "OK",
            () => {
                let liam_token;
                
                return request(app)
                    .post(
                        "/api/v1/usuarios/login"
                    )
                    .send(
                        {
                            email: "liam@test.database.cric.com.br",
                            senha: "123.456"
                        }
                    )
                    .then(
                        (response) => {
                            liam_token = response.body.Authorization;

                            request(app)
                                .post("/api/v1/usuarios/logout")
                                .set(
                                    "Authorization",
                                    liam_token
                                )
                                .send()
                                .then(
                                    response => {
                                        expect(response.statusCode).toBe(200);
                                    }
                                );
                        }
                    );
            }
        );
    }
);

describe(
    "POST /api/v1/usuarios/senha/trocar",
    () => {
        test(
            "unauthorized",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/trocar")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(401);
                        }
                    );
            }
        );

        test(
            "missing new_password1",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/trocar")
                    .set(
                        "Authorization",
                        amelia_token
                    )
                    .send(
                        {
                            new_password2: "qwerty.uiop",
                            old_password: "123.456"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                        }
                    );
            }
        );

        test(
            "missing new_password2",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/trocar")
                    .set(
                        "Authorization",
                        amelia_token
                    )
                    .send(
                        {
                            new_password1: "qwerty.uiop",
                            old_password: "123.456"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(200);
                        }
                    );
            }
        );

        test(
            "missing old_password",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/trocar")
                    .set(
                        "Authorization",
                        amelia_token
                    )
                    .send(
                        {
                            new_password1: "qwerty.uiop",
                            new_password2: "qwerty.uiop"
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "OK",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/trocar")
                    .set(
                        "Authorization",
                        amelia_token
                    )
                    .send(
                        {
                            new_password1: "qwerty.uiop",
                            new_password2: "qwerty.uiop",
                            old_password: "123.456"
                        }
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
    "POST /api/v1/usuarios/senha/recuperar",
    () => {
        test(
            "missing email",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/recuperar")
                    .send(
                        {
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(400);
                        }
                    );
            }
        );

        test(
            "OK",
            () => {
                return request(app)
                    .post("/api/v1/usuarios/senha/recuperar")
                    .send(
                        {
                            email: "amara@test.database.cric.com.br"
                        }
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

