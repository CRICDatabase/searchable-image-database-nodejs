"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a cytopathologist.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.id - Integer referencing UsuarioBaseModel.
 * @param {string} data.codigo_crc - User's license to provide diagnostic.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class CitopatologistaModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            codigo_crc: DataTypes.STRING
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
            tableName: "citopatologista"
        });
    }
}

module.exports = CitopatologistaModel;
