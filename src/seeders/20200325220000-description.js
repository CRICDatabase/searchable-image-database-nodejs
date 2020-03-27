'use strict';

const Criptografia = require('../utils/criptografia');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('descricao', [
            {
                id: 1,
                codigo: 1,
                nome: "Description 1",
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            },
            {
                id: 2,
                codigo: 2,
                nome: "Description 2",
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            },
            {
                id: 3,
                codigo: 3,
                nome: "Description 3",
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            },
            {
                id: 4,
                codigo: 4,
                nome: "Description 4",
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('descricao', null, {});
    }
};
