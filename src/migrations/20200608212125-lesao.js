"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('lesao', 'id_collection', Sequelize.BIGINT, 
            {
                allowNull: false,
                references: { model: "collection", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            }
        )
        .then(
            ()=>{
                return queryInterface.bulkUpdate('lesao', 
                {
                    id_collection: 1,
                },{
                    nome: '*',
                }
                );
            }
        );
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('lesao', 'id_collection');
    }
};
