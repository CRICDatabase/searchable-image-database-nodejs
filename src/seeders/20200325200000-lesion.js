"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("lesao", [
            /* The id equals 1 is used as foreign key to represent "Not applied". */
            {
                id: 1,
                nome: "Not applied",
                detalhes: "",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 2,
                nome: "ASC-US",
                detalhes: "",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 3,
                nome: "LSIL",
                detalhes: "",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 4,
                nome: "ASC-H",
                detalhes: "",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 5,
                nome: "HSIL",
                detalhes: "",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 6,
                nome: "Carcinoma",
                detalhes: "",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("lesao", null, {});
    }
};
