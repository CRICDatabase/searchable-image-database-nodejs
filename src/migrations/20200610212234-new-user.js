"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(
            () => {
                return Promise.all(
                    [
                        queryInterface.addColumn(
                            "usuario_base",
                            "admin",
                            Sequelize.BOOLEAN
                        )
                    ]
                );
            }
        )
            .then(
                () => {
                    return Promise.all(
                        [
                            queryInterface.sequelize.query(`
UPDATE
  usuario_base
  INNER JOIN administrador ON usuario_base.id = administrador.id
SET
  admin = 1
                        `)
                        ]
                    );
                }
            )
            .then(
                () => {
                    return Promise.all(
                        [
                            queryInterface.dropTable(
                                "administrador"
                            ),
                            queryInterface.dropTable(
                                "analista"
                            )
                        ]
                    );
                }
            );
    },

    down: (queryInterface) => {
        return queryInterface.sequelize.transaction(
            () => {
                return Promise.all(
                    [
                        queryInterface.removeColumn(
                            "usuario_base",
                            "admin"
                        )
                    ]
                );
            }
        );
    }
};
