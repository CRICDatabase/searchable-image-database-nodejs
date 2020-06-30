"use strict";

const UsuarioBaseFixtures = require("../fixtures/user");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "usuario_base",
            UsuarioBaseFixtures.fixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("usuario_base", null, {});
    }
};
