"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("citopatologista", [
            {
                id: 1,
                codigo_crc: "fake",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 4,
                codigo_crc: "fake",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("citopatologista", null, {});
    }
};
