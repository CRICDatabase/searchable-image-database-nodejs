"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "lesao",
            "grade",
            Sequelize.INTEGER,
            {}
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 0
                    },
                    {
                        id: 1
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 1
                    },
                    {
                        id: 2
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 2
                    },
                    {
                        id: 3
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 3
                    },
                    {
                        id: 4
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 4
                    },
                    {
                        id: 5
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 5
                    },
                    {
                        id: 6
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        grade: 6
                    },
                    {
                        id: 7
                    }
                );
            }
        );
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn(
            "lesao",
            "grade",
            {}
        );
    }
};
