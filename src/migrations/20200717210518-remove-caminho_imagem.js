"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.removeColumn(
            "imagem",
            "caminho_imagem",
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "imagem",
            "caminho_imagem",
            Sequelize.INTEGER,
            {}
        );
    }
};
