"use strict";

const SegmentacaoNucleoFixtures = require("../fixtures/nucleus");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "segmentacao_nucleo",
            SegmentacaoNucleoFixtures.fixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("segmentacao_nucleo", null, {});
    }
};
