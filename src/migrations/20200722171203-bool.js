'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all(
            [
                queryInterface.changeColumn(
                    "imagem",
                    "excluida",
                    Sequelize.BOOLEAN
                ),
                queryInterface.changeColumn(
                    "imagem",
                    "classificacao_aprovada",
                    Sequelize.BOOLEAN
                )
            ]
        );
  },

    down: (queryInterface, Sequelize) => {
                return Promise.all(
            [
                queryInterface.changeColumn(
                    "imagem",
                    "excluida",
                    Sequelize.INTEGER
                ),
                queryInterface.changeColumn(
                    "imagem",
                    "classificacao_aprovada",
                    Sequelize.INTEGER
                )
            ]
        );
  }
};
