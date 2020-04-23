"use strict";

const { Model, DataTypes }  = require("sequelize");

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
                    exclude: ["created_at", "updated_at"]
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

        //verificar se vai continuar dando erro aqui
        this.belongsTo(models.CelulaModel, {
            foreignKey: "id_celula", as: "fk_classificacao_celula_celula"
        });
    }
}

module.exports = ClassificacaoCelulaModel;
