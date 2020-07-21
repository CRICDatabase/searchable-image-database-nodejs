"use strict";

const ImagemFixtures = require("../fixtures/image.json");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "imagem",
            ImagemFixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("imagem", null, {});
    }
};
