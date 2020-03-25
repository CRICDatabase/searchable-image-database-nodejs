'use strict';

module.exports = {
    //Aplica as modificacoes especificadas
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('usuario_base',
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                primeiro_nome: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                ultimo_nome: {
                    type: Sequelize.STRING(45),
                    allowNull: true
                },
                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                senha: {
                    type: Sequelize.STRING(150),
                    allowNull: false
                },
                ativo: {
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
                },
            },
            {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    //Desfaz as modificações aplicadas
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('usuario_base');
    }
};
