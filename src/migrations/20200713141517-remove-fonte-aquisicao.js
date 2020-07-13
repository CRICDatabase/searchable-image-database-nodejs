'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.removeColumn(
            "imagem",
            "fonte_aquisicao",
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "imagem",
            "fonte_aquisicao",
            Sequelize.INTEGER,
            {}
        );
    }
};
