"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("descricao",
            {
                id: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                codigo: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING(45),
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
                    queryInterface.bulkInsert("descricao", [
                        {
                            id: 1,
                            codigo: 0,
                            nome: "Not Applied",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 2,
                            codigo: 1,
                            nome: "Epithelia",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 3,
                            codigo: 2,
                            nome: "Flora",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 4,
                            codigo: 3,
                            nome: "Others",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 5,
                            codigo: 11,
                            nome: "Squamous",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 6,
                            codigo: 12,
                            nome: "Metaplastic",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 7,
                            codigo: 13,
                            nome: "Glandular",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 8,
                            codigo: 20,
                            nome: "Leptothrix",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 9,
                            codigo: 21,
                            nome: "Lactobacilli",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 10,
                            codigo: 22,
                            nome: "Coccobacilli ",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 11,
                            codigo: 23,
                            nome: "Trichomonas",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 12,
                            codigo: 24,
                            nome: "Candida",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 13,
                            codigo: 25,
                            nome: "Actinomyces",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 14,
                            codigo: 26,
                            nome: "Gardnerella/Mobiluncus",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 15,
                            codigo: 27,
                            nome: "Chlamydia",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 16,
                            codigo: 28,
                            nome: "Herpes",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 17,
                            codigo: 29,
                            nome: "Cytomegalovirus (CMV)",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 18,
                            codigo: 31,
                            nome: "Neutrophils",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 19,
                            codigo: 32,
                            nome: "Red blood cells",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 20,
                            codigo: 33,
                            nome: "Mucus",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 21,
                            codigo: 34,
                            nome: "Histiocyte",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 22,
                            codigo: 35,
                            nome: "Lymphocyte",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 23,
                            codigo: 36,
                            nome: "Contaminants",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 24,
                            codigo: 37,
                            nome: "Artifact",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 25,
                            codigo: 111,
                            nome: "Young",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 26,
                            codigo: 112,
                            nome: "Mature",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 27,
                            codigo: 121,
                            nome: "Young",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 28,
                            codigo: 122,
                            nome: "Mature",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 29,
                            codigo: 131,
                            nome: "Endocervical",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 30,
                            codigo: 132,
                            nome: "Endometrial",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 31,
                            codigo: 201,
                            nome: "Bacilli",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 32,
                            codigo: 1111,
                            nome: "Basal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 33,
                            codigo: 1112,
                            nome: "Parabasal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 34,
                            codigo: 1121,
                            nome: "Superficial",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 35,
                            codigo: 1122,
                            nome: "Intermediate",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 36,
                            codigo: 1211,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 37,
                            codigo: 1212,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 38,
                            codigo: 1221,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 39,
                            codigo: 1222,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 40,
                            codigo: 1311,
                            nome: "Picket-fence",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 41,
                            codigo: 1312,
                            nome: "Honeycomb",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 42,
                            codigo: 1313,
                            nome: "Isolated",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 43,
                            codigo: 1321,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 44,
                            codigo: 1322,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 45,
                            codigo: 11111,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 46,
                            codigo: 11112,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 47,
                            codigo: 11121,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 48,
                            codigo: 11122,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 49,
                            codigo: 11211,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 50,
                            codigo: 11212,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 51,
                            codigo: 11221,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 52,
                            codigo: 11222,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 53,
                            codigo: 12121,
                            nome: "ASC-H",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 54,
                            codigo: 12122,
                            nome: "HSIL",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 55,
                            codigo: 12123,
                            nome: "Invasive Carcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 56,
                            codigo: 12221,
                            nome: "ASC-US",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 57,
                            codigo: 12222,
                            nome: "LSIL",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 58,
                            codigo: 13111,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 59,
                            codigo: 13112,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 60,
                            codigo: 13121,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 61,
                            codigo: 13122,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 62,
                            codigo: 13131,
                            nome: "Normal",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 63,
                            codigo: 13132,
                            nome: "Changed",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 64,
                            codigo: 13221,
                            nome: "AGC - Endometrial",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 65,
                            codigo: 13222,
                            nome: "Endometrial Adenocarcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 66,
                            codigo: 111121,
                            nome: "ASC-H",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 67,
                            codigo: 111122,
                            nome: "HSIL",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 68,
                            codigo: 111123,
                            nome: "Invasive Carcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 69,
                            codigo: 111221,
                            nome: "ASC-H",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 70,
                            codigo: 111222,
                            nome: "HSIL",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 71,
                            codigo: 111223,
                            nome: "Invasive Carcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 72,
                            codigo: 112121,
                            nome: "ASC-US",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 73,
                            codigo: 112122,
                            nome: "LSIL",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 74,
                            codigo: 112221,
                            nome: "ASC-US",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 75,
                            codigo: 112222,
                            nome: "LSIL",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 76,
                            codigo: 131121,
                            nome: "AGC",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 77,
                            codigo: 131122,
                            nome: "Adenocarcinoma in situ",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 78,
                            codigo: 131123,
                            nome: "Invasive Adenocarcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 79,
                            codigo: 131221,
                            nome: "AGC",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 80,
                            codigo: 131222,
                            nome: "Adenocarcinoma in situ",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 81,
                            codigo: 131223,
                            nome: "Invasive Adenocarcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 82,
                            codigo: 131321,
                            nome: "AGC",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 83,
                            codigo: 131322,
                            nome: "Adenocarcinoma in situ",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        },
                        {
                            id: 84,
                            codigo: 131323,
                            nome: "Invasive Adenocarcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        }
                    ], {});
                }
            );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("descricao");
    }
};
