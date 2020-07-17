"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a image.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {string} data.nome - Identifier for the image.
 * @param {string} data.doi - DOI assign to the image.
 * @param {string} data.codigo_lamina - Code from the glass.
 * @param {number} data.excluida - 1 if image was removed and 0 otherwise.
 * @param {number} data.classificacao_aprovada - 1 if image was approved and 0 otherwise.
 * @param {string} data.dt_aquisicao - date when the image was scanned.
 * @param {number} data.altura - height of the image in number of pixels.
 * @param {number} data.largura - width of the image in number of pixels.
 * @param {number} data.id_usuario - Integer referencing UsuarioBaseModel.
 * @param {number} data.id_lesao - Integer referencing LesaoModel.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class ImagemModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            nome: DataTypes.STRING,
            doi: DataTypes.STRING,
            codigo_lamina: DataTypes.STRING,
            excluida: DataTypes.INTEGER,
            classificacao_aprovada: DataTypes.INTEGER,
            dt_aquisicao: DataTypes.DATE,
            altura: DataTypes.INTEGER,
            largura: DataTypes.INTEGER
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
            tableName: "imagem" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {

        this.belongsTo(models.UsuarioBaseModel, {
            foreignKey: "id_usuario", as: "fk_imagem_usuario_base"
        });

        this.belongsTo(models.LesaoModel, {
            foreignKey: "id_lesao", as: "fk_imagem_lesao"
        });
    }
}

module.exports = ImagemModel;
