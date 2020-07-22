"use strict";

const { Model, DataTypes }  = require("sequelize");

/**
 * Represents a cell.
 * @constructor
 * @param {Object} data - Data sent to server.
 * @param {number} data.coord_x - Integer of coordinate x of the pixel that is part of the nucleus segmentation.
 * @param {number} data.coord_y - Integer of coordinate y of the pixel that is part of the nucleus segmentation.
 * @param {number} data.id_usuario - Integer referencing UsuarioBaseModel that create the segmentation.
 * @param {number} data.id_celula - Integer referencing CelulaModel where the segmentation belongs.
 * @returns {Promise} Promise instance of Sequelize object that was created.
 */
class SegmentacaoNucleoModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            coord_x: DataTypes.INTEGER,
            coord_y: DataTypes.INTEGER
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
            tableName: "segmentacao_nucleo" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {

        this.belongsTo(models.UsuarioBaseModel, {
            foreignKey: "id_usuario", as: "fk_segmentacao_nucleo_usuario_base"
        });

        //verificar se vai continuar dando erro aqui
        this.belongsTo(models.CelulaModel, {
            foreignKey: "id_celula", as: "fk_segmentacao_nucleo_celula"
        });
    }
}

module.exports = SegmentacaoNucleoModel;
