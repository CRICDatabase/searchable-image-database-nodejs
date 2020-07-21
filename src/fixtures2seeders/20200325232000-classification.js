"use strict";

const ClassificacaoCelulaFixtures = require("../fixtures/classification.json");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "classificacao_celula",
            ClassificacaoCelulaFixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("classificacao_celula", null, {});
    }
};
