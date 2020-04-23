"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("classificacao_celula", [
            {
                id: 1,
                coord_centro_nucleo_x: 274,
                coord_centro_nucleo_y: 321,
                id_usuario: 1,
                id_celula: 1,
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 2,
                coord_centro_nucleo_x: 263,
                coord_centro_nucleo_y: 97,
                id_usuario: 1,
                id_celula: 2,
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("classificacao_celula", null, {});
    }
};
