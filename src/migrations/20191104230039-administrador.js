"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("administrador",
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    allowNull: false,
                    references: { model: "usuario_base", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "RESTRICT"
                },
                nivel_acesso: {
                    type: Sequelize.STRING(20),
                    allowNull: false
                },
                api_key: {
                    type: Sequelize.STRING(250),
                    allowNull: true
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

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("administrador");
    }
};
