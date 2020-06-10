"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a user.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {string} data.primeiro_nome - First name.
 * @param {string} data.ultimo_nome - Family name.
 * @param {string} data.email - Email address.
 * @param {string} data.senha - Password for the user. We store a hash of the password.
 * @param {number} data.ativo - 1 if account is active and 0 if account was disabled.
 * @param {number} data.admin - 1 if account has admin rights and 0 otherwise.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class UsuarioBaseModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            primeiro_nome: DataTypes.STRING,
            ultimo_nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
            admin: DataTypes.BOOLEAN

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
            tableName: "usuario_base" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = UsuarioBaseModel;
