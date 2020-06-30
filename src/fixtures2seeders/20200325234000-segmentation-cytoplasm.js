"use strict";

const SegmentacaoCitoplasmaFixtures = require("../fixtures/cytoplasm");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "segmentacao_citoplasma",
            SegmentacaoCitoplasmaFixtures.fixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("segmentacao_citoplasma", null, {});
    }
};
