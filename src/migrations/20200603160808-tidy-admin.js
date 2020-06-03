"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.transaction(
            t => {
                return Promise.all(
                    [
                        queryInterface.removeColumn(
                            "administrador",
                            "api_key",
                            { transaction: t }
                        ),
                        queryInterface.removeColumn(
                            "administrador",
                            "nivel_acesso",
                            { transaction: t }
                        )
                    ]
                );
            }
        );
    },

    down: () => {
    }
};
