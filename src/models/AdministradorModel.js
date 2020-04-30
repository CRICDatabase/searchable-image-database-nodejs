"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a administrator.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.id - Integer referencing UsuarioBaseModel.
 * @param {string} data.api_key - Administrator's key to the REST API.
 * @param {string} data.nivel_acesso - Administrator's access level.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class AdministradorModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            api_key: DataTypes.STRING,
            nivel_acesso: DataTypes.STRING
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
            tableName: "administrador"
        });
    }
}

module.exports = AdministradorModel;
