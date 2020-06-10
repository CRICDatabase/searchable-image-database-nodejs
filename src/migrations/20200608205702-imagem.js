"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('imagem', 'id_collection' , Sequelize.BIGINT, {
            
            allowNull: false,
            references: { model: "collection", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
         });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('imagem', 'id_collection');
    }
};
