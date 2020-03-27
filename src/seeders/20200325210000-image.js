'use strict';

const Criptografia = require('../utils/criptografia');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('imagem', [
            {
                id: 1,
                nome: "example0001.jpg",
                codigo_lamina: "0001",
                excluida: 0,
                classificacao_aprovada: 1,
                dt_aquisicao: '2020-01-01',
                fonte_aquisicao: 1,
                caminho_imagem: "src/assets/imagens/seeders/example0001.jpg",
                altura: 400,
                largura: 600,
                id_usuario: 1,
                id_lesao: 1,
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            },
            {
                id: 2,
                nome: "example0002.jpg",
                codigo_lamina: "0002",
                excluida: 0,
                classificacao_aprovada: 1,
                dt_aquisicao: '2020-01-01',
                fonte_aquisicao: 1,
                caminho_imagem: "src/assets/imagens/seeders/example0002.jpg",
                altura: 400,
                largura: 600,
                id_usuario: 1,
                id_lesao: 2,
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            },
            {
                id: 3,
                nome: "example0003.jpg",
                codigo_lamina: "0003",
                excluida: 0,
                classificacao_aprovada: 1,
                dt_aquisicao: '2020-01-01',
                fonte_aquisicao: 1,
                caminho_imagem: "src/assets/imagens/seeders/example0003.jpg",
                altura: 400,
                largura: 600,
                id_usuario: 1,
                id_lesao: 1,
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('imagem', null, {});
    }
};
