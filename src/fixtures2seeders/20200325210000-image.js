"use strict";

const ImagemFixtures = require("../fixtures/image");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "imagem",
            ImagemFixtures.fixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("imagem", null, {});
    }
};
