'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('imagem',
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING(150),
                    allowNull: false
                },
                codigo_lamina: {
                    type: Sequelize.STRING(60),
                    allowNull: true
                },
                excluida: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                classificacao_aprovada: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                dt_aquisicao: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                fonte_aquisicao: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                caminho_imagem: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                altura: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                largura: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                id_usuario: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: 'usuario_base', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                },
                id_lesao: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: 'lesao', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
            },
            {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('imagem');
    }
};
