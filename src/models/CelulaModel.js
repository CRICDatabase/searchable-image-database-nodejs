"use strict";

const { Model, DataTypes }  = require("sequelize");

class CelulaModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            tipo_analise_realizada: DataTypes.STRING
        },
        {
            defaultScope: {
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt"
                    ]
                }
            },
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: "celula" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {

        this.belongsTo(models.ImagemModel, {
            foreignKey: "id_imagem", as: "fk_celula_imagem"
        });

        this.belongsTo(models.LesaoModel, {
            foreignKey: "id_lesao", as: "fk_celula_lesao"
        });

        this.belongsTo(models.DescricaoModel, {
            foreignKey: "id_descricao", as: "fk_celula_descricao"
        });
    }
}

module.exports = CelulaModel;
