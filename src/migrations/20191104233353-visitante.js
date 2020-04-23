"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("visitante",
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    allowNull: false,
                    references: { model: "usuario_base", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "RESTRICT"
                },
                pais: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                estado_regiao: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                cidade: {
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
        return queryInterface.dropTable("visitante");
    }
};
