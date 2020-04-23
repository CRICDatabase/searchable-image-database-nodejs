"use strict";

const { Model, DataTypes }  = require("sequelize");

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
