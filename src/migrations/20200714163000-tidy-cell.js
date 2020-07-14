"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.removeConstraint(
            "classificacao_celula",
            "classificacao_celula_ibfk_2"
        ).then(
            () => {
                return queryInterface.bulkDelete(
                    "celula",
                    {
                        tipo_analise_realizada: "CLASSIFICACAO"
                    }
                );
            }
        ).then(
            () => {
                return Promise.all(
                    [
                        queryInterface.removeColumn(
                            "celula",
                            "tipo_analise_realizada"
                        ),
                        queryInterface.removeColumn(
                            "celula",
                            "id_lesao"
                        ),
                        queryInterface.removeColumn(
                            "classificacao_celula",
                            "id_celula"
                        )
                    ]
                );
            }
        );
    },

    down: () => {
    }
};
