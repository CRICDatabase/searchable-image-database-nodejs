"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "usuario_base",
            "token",
            Sequelize.STRING(250),
            {}
        )
        .then(
            () => {
                return queryInterface.bulkUpdate(
                    'usuario_base',
                    {
                        token: 'sample',
                    },
                    {}
                );
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "usuario_base",
            "token"
        );
    }
};
