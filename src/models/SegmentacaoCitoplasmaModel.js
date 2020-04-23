"use strict";

const { Model, DataTypes }  = require("sequelize");

class SegmentacaoCitoplasmaModel extends Model {

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
            tableName: "segmentacao_citoplasma" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {

        this.belongsTo(models.UsuarioBaseModel, {
            foreignKey: "id_usuario", as: "fk_segmentacao_citoplasma_usuario_base"
        });

        //verificar se vai continuar dando erro aqui
        this.belongsTo(models.CelulaModel, {
            foreignKey: "id_celula", as: "fk_segmentacao_citoplasma_celula"
        });
    }
}

module.exports = SegmentacaoCitoplasmaModel;
