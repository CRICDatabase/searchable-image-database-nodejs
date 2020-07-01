"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('descricao', 'id_collection', Sequelize.BIGINT, 
            {
                allowNull: false,
                references: { model: "collection", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            }
        )
        .then(
            ()=>{
                return queryInterface.bulkUpdate('descricao', 
                {
                    id_collection: 1,
                },{
                    codigo: '*',
                }
                );
            }
        );
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('descricao', 'id_collection');
    }
};
