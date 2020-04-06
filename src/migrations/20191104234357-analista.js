'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('analista',
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    allowNull: false,
                    references: { model: 'usuario_base', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
                },
                total_segmentacoes: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                total_classificacoes: {
                    type: Sequelize.INTEGER,
                    allowNull: false
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
        return queryInterface.dropTable('analista');
    }
};
