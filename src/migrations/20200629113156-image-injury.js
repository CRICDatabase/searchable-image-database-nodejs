"use strict";

const ImagemModel = require("../models/ImagemModel");
const LesaoModel = require("../models/LesaoModel");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "lesao",
            [
                {
                    id: 7,
                    nome: "SCC",
                    detalhes: "Squamous cell carcinoma",
                    created_at: "2020-01-01",
                    updated_at: "2020-01-01"
                }
            ]
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 7
                    },
                    {
                        id_lesao: 6
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 6
                    },
                    {
                        id_lesao: 5
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 5
                    },
                    {
                        id_lesao: 4
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 4
                    },
                    {
                        id_lesao: 3
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 3
                    },
                    {
                        id_lesao: 2
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 2
                    },
                    {
                        id_lesao: 1
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        nome: "HSIL",
                        detalhes: "High grade squamous intraepithelial lesion"
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
                        nome: "ASC-H",
                        detalhes: "Atypical squamous cells cannot exclude HSIL"
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
                        nome: "LSIL",
                        detalhes: "Low grade squamous intraepithelial lesion"
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
                        nome: "ASC-US",
                        detalhes: "Atypical squamous cells of undetermined significance"
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
                        nome: "Negative",
                        detalhes: "Negative for intraepithelial lesion"
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
                        nome: "Unkown",
                        detalhes: "Unkown"
                    },
                    {
                        id: 1
                    }
                );
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkUpdate(
            "imagem",
            {
                id_lesao: 1
            },
            {
                id_lesao: 2
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 2
                    },
                    {
                        id_lesao: 3
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 3
                    },
                    {
                        id_lesao: 4
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 4
                    },
                    {
                        id_lesao: 5
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 5
                    },
                    {
                        id_lesao: 6
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 6
                    },
                    {
                        id_lesao: 7
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "imagem",
                    {
                        id_lesao: 7
                    },
                    {
                        id_lesao: 6
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkUpdate(
                    "lesao",
                    {
                        nome: "SCC",
                        detalhes: "Squamous cell carcinoma"
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
                        nome: "HSIL",
                        detalhes: "High grade squamous intraepithelial lesion"
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
                        nome: "ASC-H",
                        detalhes: "Atypical squamous cells cannot exclude HSIL"
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
                        nome: "LSIL",
                        detalhes: "Low grade squamous intraepithelial lesion"
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
                        nome: "ASC-US",
                        detalhes: "Atypical squamous cells of undetermined significance"
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
                        nome: "Negative",
                        detalhes: "Negative for intraepithelial lesion"
                    },
                    {
                        id: 1
                    }
                );
            }
        ).then(
            () => {
                queryInterface.bulkInsert(
                    "lesao",
                    [
                        {
                            id: 7,
                            nome: "SCC",
                            detalhes: "Squamous cell carcinoma",
                            created_at: "2020-01-01",
                            updated_at: "2020-01-01"
                        }
                    ]
                );
            }
        );
    }
};
