"use strict";

const ClassificacaoCelulaFixtures = require("../fixtures/classification");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "classificacao_celula",
            ClassificacaoCelulaFixtures.fixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("classificacao_celula", null, {});
    }
};
