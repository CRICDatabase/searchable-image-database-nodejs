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
                /* Anonymous user can NOT use POST method */
                return request(app)
                    .post("/api/v1/lesoes")
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
                /* User can NOT use POST method */
                return request(app)
                    .post("/api/v1/lesoes")
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
                /* Admin can use POST method */
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
                /* Anonymous user should be able to list injury */
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
                /* User should be able to list injury */
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
                /* Admin should be able to list injury */
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
