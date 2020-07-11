"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            "sessao_usuario",
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                Authorization: {
                    type: Sequelize.STRING(100),
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
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("sessao_usuario");
    }
};
