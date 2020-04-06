"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("citopatologista", [{
            id: 4,
            codigo_crc: "fake",
            created_at: "2020-01-01",
            updated_at: "2020-01-01"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("citopatologista", null, {});
    }
};
