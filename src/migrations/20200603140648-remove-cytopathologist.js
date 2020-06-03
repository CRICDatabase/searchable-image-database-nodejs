'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.dropTable("citopatologista");
  },

  down: () => {
  }
};
