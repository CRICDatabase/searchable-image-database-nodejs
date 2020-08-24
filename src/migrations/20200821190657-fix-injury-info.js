"use strict";

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "SC",
                    detalhes: "Squamous carcinoma"
                },
                {
                    id: 7
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "HSIL",
                    detalhes: "High-grade squamous intraepithelial lesion"
                },
                {
                    id: 6
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "ASC-H",
                    detalhes: "Atypical squamous cells of undetermined significance, and cannot exclude a high-grade lesion"
                },
                {
                    id: 5
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "LSIL",
                    detalhes: "Low-grade squamous intraepithelial lesion"
                },
                {
                    id: 4
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "ASC-US",
                    detalhes: "Atypical squamous cells of undetermined significance, possibly non-neoplastic"
                },
                {
                    id: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "NILM",
                    detalhes: "Negative for intraepithelial lesion or malignancy"
                },
                {
                    id: 2
                },
                { transaction }
            );
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async down() {
    }
};
