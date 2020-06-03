"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("administrador", [{
            id: 1,
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("administrador", null, {});
    }
};
