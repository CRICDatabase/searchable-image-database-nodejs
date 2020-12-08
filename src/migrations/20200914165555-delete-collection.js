'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("collection", "delete", Sequelize.BOOLEAN,
            {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            }
        )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("collection", "delete");
  }
};
