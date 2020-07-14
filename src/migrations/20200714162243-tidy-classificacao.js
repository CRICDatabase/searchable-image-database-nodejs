"use strict";

module.exports = {
    up: (queryInterface, sequelize) => {
        return Promise.all(
            [
                queryInterface.addColumn(
                    "classificacao_celula",
                    "id_lesao",
                    sequelize.DataTypes.BIGINT,
                    {
                        allowNull: false,
                        references: { model: "lesao", key: "id" },
                        onUpdate: "CASCADE",
                        onDelete: "RESTRICT"
                    }
                ),
                queryInterface.addColumn(
                    "classificacao_celula",
                    "id_imagem",
                    sequelize.DataTypes.BIGINT,
                    {
                        allowNull: false,
                        references: { model: "imagem", key: "id" },
                        onUpdate: "CASCADE",
                        onDelete: "RESTRICT"
                    }
                )
            ]
        ).then(
            () => {
                queryInterface.sequelize.query(
                    "UPDATE classificacao_celula, celula SET classificacao_celula.id_lesao = celula.id_lesao, classificacao_celula.id_imagem = celula.id_imagem WHERE classificacao_celula.id_celula = celula.id"
                );
            }
        );
    },

    down: (queryInterface) => {
        return Promise.all(
            [
                queryInterface.removeColumn(
                    "classificacao_celula",
                    "id_lesao"
                ),
                queryInterface.removeColumn(
                    "classificacao_celula",
                    "id_imagem"
                )
            ]
        );
    }
};
