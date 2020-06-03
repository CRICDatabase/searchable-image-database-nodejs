"use strict";

const { Model }  = require("sequelize");

/**
 * Represents a administrator.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.id - Integer referencing UsuarioBaseModel.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class AdministradorModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
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
