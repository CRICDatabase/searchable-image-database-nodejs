"use strict";

const UsuarioBaseFixtures = require("../fixtures/user.json");

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            "usuario_base",
            UsuarioBaseFixtures,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("usuario_base", null, {});
    }
};
