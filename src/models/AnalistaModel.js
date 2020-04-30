"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a analist.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.id - Integer referencing UsuarioBaseModel.
 * @param {number} data.total_segmentacoes - Integer representing total number of segmentations created by the user.
 * @param {number} data.total_classificacoes - Integer representing total number of classifications created by the user.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class AnalistaModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            total_segmentacoes: DataTypes.INTEGER,
            total_classificacoes: DataTypes.INTEGER
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
            tableName: "analista"
        });
    }
}

module.exports = AnalistaModel;
