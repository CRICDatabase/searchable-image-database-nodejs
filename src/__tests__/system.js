const request = require("supertest");
const app = require("../app");

describe(
    "/api/v1",
    () => {
        test(
            "GET",
            () => {
                return request(app)
                .get("/api/v1")
                .then(
                    response => {
                        expect(response.statusCode).toBe(200);
                        expect(
                            response.body
                        ).toMatchObject(
                            {
                                descricao: expect.any(String),
                                versao: expect.any(String),
                            }
                        );
                    }
                );
            }
        );
    }
);
