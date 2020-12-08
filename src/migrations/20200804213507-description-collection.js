"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("descricao", "id_collection", Sequelize.BIGINT, 
            {
                allowNull: false,
                references: { model: "collection", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            }
        )
            .then(
                ()=>{
                    return Promise.all(
                        [
                            queryInterface.sequelize.query(
                                `
                            UPDATE
                                descricao
                            SET
                                id_collection = 1
                        `
                            )
                        ]
                    );
                }
            );
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn("descricao", "id_collection");
    }
};
