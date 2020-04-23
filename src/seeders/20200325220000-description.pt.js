/*  Based on

    OLIVEIRA, Paulo Henrique Calaes.
    Segmentação de núcleos de células cervicais em exame de Papanicolau.
    2018. 71 f. Dissertação (Mestrado em Ciência da Computação) -
    Instituto de Ciências Exatas e Biológicas,
    Universidade Federal de Ouro Preto, Ouro Preto, 2018.
*/

"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("descricao", [
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
                nome: "Eptélios",
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
                nome: "Outros",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 5,
                codigo: 11,
                nome: "Escamoso",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 6,
                codigo: 12,
                nome: "Metaplásico",
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
                nome: "Leptotrix",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 9,
                codigo: 21,
                nome: "Lactobacilo",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 10,
                codigo: 22,
                nome: "Cocus",
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
                nome: "Cândida",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 13,
                codigo: 25,
                nome: "Actinomises",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 14,
                codigo: 26,
                nome: "Gardinerela/Mobiluncus",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 15,
                codigo: 27,
                nome: "Clamídea",
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
                nome: "CMV",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 18,
                codigo: 31,
                nome: "Neutrófilos",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 19,
                codigo: 32,
                nome: "Hemáceas",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 20,
                codigo: 33,
                nome: "Muco",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 21,
                codigo: 34,
                nome: "Histiócito",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 22,
                codigo: 35,
                nome: "Linfócito",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 23,
                codigo: 36,
                nome: "Contaminantes",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 24,
                codigo: 37,
                nome: "Artefato",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 25,
                codigo: 111,
                nome: "Jovem",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 26,
                codigo: 112,
                nome: "Madura",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 27,
                codigo: 121,
                nome: "Jovem",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 28,
                codigo: 122,
                nome: "Madura",
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
                nome: "Bacilo",
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
                nome: "Intermediária",
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
                nome: "Alterada",
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
                nome: "Alterada",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 40,
                codigo: 1311,
                nome: "Paliçada",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 41,
                codigo: 1312,
                nome: "Colméia",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 42,
                codigo: 1313,
                nome: "Isolada",
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
                nome: "Alterada",
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
                nome: "Alterada",
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
                nome: "Alterada",
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
                nome: "Alterada",
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
                nome: "Alterada",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 53,
                codigo: 12121,
                nome: "ASCH",
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
                nome: "Carcinoma Invasor",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 56,
                codigo: 12221,
                nome: "ASCUS",
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
                nome: "Alterada",
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
                nome: "Alterada",
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
                nome: "Alterada",
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
                nome: "Adenocarsinoma Invasor Endometrial",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 66,
                codigo: 111121,
                nome: "ASCH",
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
                nome: "Carcinoma Invasor",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 69,
                codigo: 111221,
                nome: "ASCH",
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
                nome: "Carcinoma Invasor",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 72,
                codigo: 112121,
                nome: "ASCUS",
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
                nome: "ASCUS",
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
                nome: "Adeno in sito",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 78,
                codigo: 131123,
                nome: "Adeno invasor",
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
                nome: "Adeno in sito",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 81,
                codigo: 131223,
                nome: "Adeno invasor",
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
                nome: "Adeno in sito",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            },
            {
                id: 84,
                codigo: 131323,
                nome: "Adeno invasor",
                created_at: "2020-01-01",
                updated_at: "2020-01-01"
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("descricao", null, {});
    }
};
