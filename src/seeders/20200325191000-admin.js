"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("administrador", [{
            id: 1,
            api_key: "",
            nivel_acesso: "TOTAL",
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("administrador", null, {});
    }
};
