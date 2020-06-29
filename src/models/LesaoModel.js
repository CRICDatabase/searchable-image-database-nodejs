"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a injury.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {string} data.nome - Name of the injury.
 * @param {string} data.detalhes - Details of the injury.
 * @param {number} data.grade - Integer indicating how severe is the injury. Higher number means more severe.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class LesaoModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            nome: DataTypes.STRING,
            detalhes: DataTypes.STRING,
            grade: DataTypes.INTEGER
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
            tableName: "lesao" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = LesaoModel;
