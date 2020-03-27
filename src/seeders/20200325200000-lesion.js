'use strict';

const Criptografia = require('../utils/criptografia');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('lesao', [
            {
                id: 1,
                nome: "LSIL",
                detalhes: "",
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            },
            {
                id: 2,
                nome: "HSIL",
                detalhes: "",
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('lesao', null, {});
    }
};
