"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a cell.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {string} data.tipo_analise_realizada - "CLASSIFICACAO" or "SEGMENTACAO".
 * @param {number} data.id_imagem - Integer referencing ImagemModel where the cell belongs.
 * @param {number} data.id_lesao - Integer referencing LesaoModel that identify the injury the cell has.
 * @param {number} data.id_descricao - Integer referencing DescricaoModel that identify the description of the cell.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
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
