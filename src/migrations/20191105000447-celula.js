'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('celula',
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                tipo_analise_realizada: {
                    type: Sequelize.STRING(20),
                    allowNull: false
                },
                id_imagem: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: 'imagem', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                id_lesao: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: 'lesao', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
                },
                id_descricao: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: 'descricao', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('celula');
    }
};
