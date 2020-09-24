"use strict";

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkInsert(
                "lesao",
                [
                    {
                        id: 7,
                        nome: "SCC",
                        detalhes: "Squamous cell carcinoma",
                        created_at: "2020-01-01",
                        updated_at: "2020-01-01"
                    }
                ],
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 7
                },
                {
                    id_lesao: 6
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 6
                },
                {
                    id_lesao: 5
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 5
                },
                {
                    id_lesao: 4
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 4
                },
                {
                    id_lesao: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 3
                },
                {
                    id_lesao: 2
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 2
                },
                {
                    id_lesao: 1
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 7
                },
                {
                    id_lesao: 6
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 6
                },
                {
                    id_lesao: 5
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 5
                },
                {
                    id_lesao: 4
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 4
                },
                {
                    id_lesao: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 3
                },
                {
                    id_lesao: 2
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 2
                },
                {
                    id_lesao: 1
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "HSIL",
                    detalhes: "High grade squamous intraepithelial lesion"
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
                    detalhes: "Atypical squamous cells cannot exclude HSIL"
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
                    detalhes: "Low grade squamous intraepithelial lesion"
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
                    detalhes: "Atypical squamous cells of undetermined significance"
                },
                {
                    id: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "Negative",
                    detalhes: "Negative for intraepithelial lesion"
                },
                {
                    id: 2
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "Unkown",
                    detalhes: "Unkown"
                },
                {
                    id: 1
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

    async down(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 1
                },
                {
                    id_lesao: 2
                }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 2
                },
                {
                    id_lesao: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 3
                },
                {
                    id_lesao: 4
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 4
                },
                {
                    id_lesao: 5
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 5
                },
                {
                    id_lesao: 6
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "imagem",
                {
                    id_lesao: 6
                },
                {
                    id_lesao: 7
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 1
                },
                {
                    id_lesao: 2
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 2
                },
                {
                    id_lesao: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 3
                },
                {
                    id_lesao: 4
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 4
                },
                {
                    id_lesao: 5
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 5
                },
                {
                    id_lesao: 6
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "celula",
                {
                    id_lesao: 6
                },
                {
                    id_lesao: 7
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "SCC",
                    detalhes: "Squamous cell carcinoma"
                },
                {
                    id: 6
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "HSIL",
                    detalhes: "High grade squamous intraepithelial lesion"
                },
                {
                    id: 5
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "ASC-H",
                    detalhes: "Atypical squamous cells cannot exclude HSIL"
                },
                {
                    id: 4
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "LSIL",
                    detalhes: "Low grade squamous intraepithelial lesion"
                },
                {
                    id: 3
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "ASC-US",
                    detalhes: "Atypical squamous cells of undetermined significance"
                },
                {
                    id: 2
                },
                { transaction }
            );
            await queryInterface.bulkUpdate(
                "lesao",
                {
                    nome: "Negative",
                    detalhes: "Negative for intraepithelial lesion"
                },
                {
                    id: 1
                },
                { transaction }
            );
            await queryInterface.bulkDelete(
                "lesao",
                {
                    id: 7
                },
                { transaction }
            );
            await transaction.commit();

        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }

    }
};
