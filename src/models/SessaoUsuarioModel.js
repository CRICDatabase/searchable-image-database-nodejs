"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents the session of one user.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {string} data.email - Email address of user.
 * @param {string} data.Authorization - Authorization token assigned to the email address.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class SessaoUsuarioModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            email: DataTypes.STRING,
            Authorization: DataTypes.STRING
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
            tableName: "sessao_usuario" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = SessaoUsuarioModel;
