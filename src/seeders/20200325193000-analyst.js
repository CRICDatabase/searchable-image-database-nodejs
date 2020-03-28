'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('analista', [{
            id: 4,
            total_segmentacoes: 28,
            total_classificacoes: 2,
            created_at: '2020-01-01',
            updated_at: '2020-01-01'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('analista', null, {});
    }
};
