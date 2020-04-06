"use strict";

//Relacionamento N-N
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("classificacao_celula",
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                coord_centro_nucleo_x: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                coord_centro_nucleo_y: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                id_usuario: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: "usuario_base", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "RESTRICT"
                },
                id_celula: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: { model: "celula", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "RESTRICT"
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
        return queryInterface.dropTable("classificacao_celula");
    }
};
