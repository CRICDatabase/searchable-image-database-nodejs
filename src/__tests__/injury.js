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
    "POST /api/v1/lesoes",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .post("/api/v1/lesoes")
                    .send(
                        {
                            nome: "Test",
                            detalhes: "Test",
                            grade: 100
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
                    .post("/api/v1/lesoes")
                    .send(
                        {
                            nome: "Test",
                            detalhes: "Test",
                            grade: 100
                        }
                    )
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
                    .post("/api/v1/lesoes")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            nome: "Test",
                            detalhes: "Test",
                            grade: 100
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    id: expect.any(Number),
                                    nome: "Test",
                                    detalhes: "Test",
                                    grade: 100
                                }
                            );
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/lesoes (missing detalhes)",
    () => {
        /* No test for annoymous as it can't use POST method */

        /* No test for charles as it can't use POST method */

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/lesoes")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            nome: "Test",
                            grade: 100
                        }
                    )
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.CREATED);
                        }
                    );
            }
        );

    }
);

describe(
    "POST /api/v1/lesoes (missing nome)",
    () => {
        /* No test for annoymous as it can't use POST method */

        /* No test for charles as it can't use POST method */

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            detalhes: "Test",
                            grade: 100
                        }
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
    "POST /api/v1/lesoes (missing grade)",
    () => {
        /* No test for annoymous as it can't use POST method */

        /* No test for charles as it can't use POST method */

        test(
            "admin",
            () => {
                return request(app)
                    .post("/api/v1/imagens-lesoes/1")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            detalhes: "Test",
                            nome: "Test"
                        }
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
    "GET /api/v1/lesoes",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/lesoes")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
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
            "charles",
            () => {
                return request(app)
                    .get("/api/v1/lesoes")
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
            "admin",
            () => {
                return request(app)
                    .get("/api/v1/lesoes")
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
    "GET /api/v1/lesoes/:id_lesoes(\\d+)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/lesoes/1")
                    .then(
                        response => {
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    id: 1,
                                    nome: expect.any(String),
                                    detalhes: expect.any(String),
                                    grade: expect.any(Number)
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
                    .get("/api/v1/lesoes/1")
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
                                    id: 1,
                                    nome: expect.any(String),
                                    detalhes: expect.any(String),
                                    grade: expect.any(Number)
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
                    .get("/api/v1/lesoes/1")
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
                                    id: 1,
                                    nome: expect.any(String),
                                    detalhes: expect.any(String),
                                    grade: expect.any(Number)
                                }
                            );
                        }
                    );
            }
        );
    }
);

describe(
    "PUT /api/v1/lesoes/:id_lesoes(\\d+)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT",
                            grade: 100
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
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT",
                            grade: 100
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
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT",
                            grade: 100
                        }
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
    "PUT /api/v1/lesoes/:id_lesoes(\\d+) (missing nome)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .send(
                        {
                            detalhes: "Changed by PUT",
                            grade: 100
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
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            detalhes: "Changed by PUT",
                            grade: 100
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
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            detalhes: "Changed by PUT",
                            grade: 100
                        }
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
    "PUT /api/v1/lesoes/:id_lesoes(\\d+) (missing detalhes)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .send(
                        {
                            nome: "Changed by PUT",
                            grade: 100
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
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            grade: 100
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
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            grade: 100
                        }
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
    "PUT /api/v1/lesoes/:id_lesoes(\\d+) (missing grade)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT"
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
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT"
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
                return request(app)
                    .put("/api/v1/lesoes/8")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT"
                        }
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
    "PUT /api/v1/lesoes/:id_lesoes(\\d+) (not found)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .put("/api/v1/lesoes/100")
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT",
                            grade: 100
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
                    .put("/api/v1/lesoes/100")
                    .set(
                        "Authorization",
                        charles_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT",
                            grade: 100
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
                return request(app)
                    .put("/api/v1/lesoes/100")
                    .set(
                        "Authorization",
                        admin_token
                    )
                    .send(
                        {
                            nome: "Changed by PUT",
                            detalhes: "Changed by PUT",
                            grade: 100
                        }
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
    "DELETE /api/v1/lesoes/:id_lesoes(\\d+)",
    () => {
        test(
            "anonymous",
            () => {
                return request(app)
                    .get("/api/v1/lesoes/9")
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
                    .get("/api/v1/lesoes/9")
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
                    .get("/api/v1/lesoes/9")
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
