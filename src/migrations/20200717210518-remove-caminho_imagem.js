'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
