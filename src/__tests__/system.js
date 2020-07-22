const HttpStatus = require("http-status-codes");

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
                            expect(response.statusCode).toBe(HttpStatus.OK);
                            expect(
                                response.body
                            ).toMatchObject(
                                {
                                    descricao: "Center for Recognition and Inspection of Cells (CRIC) Database",
                                    versao: expect.any(String)
                                }
                            );
                        }
                    );
            }
        );
    }
);
