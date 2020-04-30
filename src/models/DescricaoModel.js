"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a injury.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {string} data.codigo - Code used in the decision tree.
 * @param {string} data.nome - Name of the node in the decision tree.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class DescricaoModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            codigo: DataTypes.INTEGER,
            nome: DataTypes.STRING
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
            tableName: "descricao" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = DescricaoModel;
