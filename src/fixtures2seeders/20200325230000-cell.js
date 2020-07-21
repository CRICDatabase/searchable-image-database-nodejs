"use strict";

const CelulaFixtures = require("../fixtures/cell.json");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "celula",
            CelulaFixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("celula", null, {});
    }
};
