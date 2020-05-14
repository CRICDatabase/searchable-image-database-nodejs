"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("lesao",
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                detalhes: {
                    type: Sequelize.STRING(1000),
                    allowNull: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
            .then(
                () => {
                    queryInterface.bulkInsert(
                        "lesao",
                        [
                            {
                                id: 1,
                                nome: "Negative for intraepithelial lesion",
                                detalhes: "",
                                created_at: "2020-01-01",
                                updated_at: "2020-01-01"
                            },
                            {
                                id: 2,
                                nome: "ASC-US",
                                detalhes: "Atypical squamous cells of undetermined significance",
                                created_at: "2020-01-01",
                                updated_at: "2020-01-01"
                            },
                            {
                                id: 3,
                                nome: "LSIL",
                                detalhes: "Low grade squamous intraepithelial lesion",
                                created_at: "2020-01-01",
                                updated_at: "2020-01-01"
                            },
                            {
                                id: 4,
                                nome: "ASC-H",
                                detalhes: "Atypical squamous cells cannot exclude HSIL",
                                created_at: "2020-01-01",
                                updated_at: "2020-01-01"
                            },
                            {
                                id: 5,
                                nome: "HSIL",
                                detalhes: "High grade squamous intraepithelial lesion",
                                created_at: "2020-01-01",
                                updated_at: "2020-01-01"
                            },
                            {
                                id: 6,
                                nome: "SCC",
                                detalhes: "Squamous cell carcinoma",
                                created_at: "2020-01-01",
                                updated_at: "2020-01-01"
                            }
                        ]
                    );
                }
            );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("lesao");
    }
};
