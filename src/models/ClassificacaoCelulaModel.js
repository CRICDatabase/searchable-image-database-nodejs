"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents the classification of one cell.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.coord_centro_nucleo_x - Integer of coordinate x of the pixel that represents the cell.
 * @param {number} data.coord_centro_nucleo_y - Integer of coordinate y of the pixel that represents the cell.
 * @param {number} data.id_lesao - Integer referencing LesaoModel that identify the injury the cell has.
 * @param {number} data.id_usuario - Integer referencing UsuarioBaseModel that create the classification.
 * @param {number} data.id_imagem - Integer referencing ImagemModel where the classification belongs.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class ClassificacaoCelulaModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            coord_centro_nucleo_x: DataTypes.INTEGER,
            coord_centro_nucleo_y: DataTypes.INTEGER
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
            tableName: "classificacao_celula" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {

        this.belongsTo(models.UsuarioBaseModel, {
            foreignKey: "id_usuario", as: "fk_classificacao_celula_usuario_base"
        });

        this.belongsTo(models.LesaoModel, {
            foreignKey: "id_lesao", as: "fk_celula_lesao"
        });

        this.belongsTo(models.ImagemModel, {
            foreignKey: "id_imagem", as: "fk_classificacao_imagem"
        });
    }
}

module.exports = ClassificacaoCelulaModel;
