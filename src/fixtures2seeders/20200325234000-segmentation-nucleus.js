"use strict";

const SegmentacaoNucleoFixtures = require("../fixtures/nucleus.json");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "segmentacao_nucleo",
            SegmentacaoNucleoFixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("segmentacao_nucleo", null, {});
    }
};
