"use strict";

const SegmentacaoCitoplasmaFixtures = require("../fixtures/cytoplasm.json");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "segmentacao_citoplasma",
            SegmentacaoCitoplasmaFixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("segmentacao_citoplasma", null, {});
    }
};
