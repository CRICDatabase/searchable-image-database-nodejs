"use strict";

const CelulaFixtures = require("../fixtures/cell");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "celula",
            CelulaFixtures.fixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("celula", null, {});
    }
};
