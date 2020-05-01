"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "imagem",
            "doi",
            Sequelize.STRING,
            {}
        );
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn(
            "imagem",
            "doi",
            {}
        );
    }
};
