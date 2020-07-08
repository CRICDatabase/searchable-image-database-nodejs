"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a cell.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.id - Integer that turns the collection unique.
 * @param {string} data.slang - Used for the URL.
 * @param {string} data.name - Name of the collection for a better organization.
 * @param {string} data.description - Describe the collection.
 * @param {boolean} data.public - Shows if it is public.
 * @param {number} data.owner - Integer referencing to UsuarioBaseModel.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class CollectionModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
           slang: DataTypes.STRING,
           name: DataTypes.STRING,
           description: DataTypes.STRING,
           public : DataTypes.BOOLEAN
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
            tableName: "collection" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {
        this.belongsTo(models.UsuarioBaseModel, {
            foreignKey: "owner", as: "fk_collection_owner"
        });
    }

}

module.exports = CollectionModel;
