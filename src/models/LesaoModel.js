"use strict";

const { Model, DataTypes }  = require("sequelize");

class LesaoModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            nome: DataTypes.STRING,
            detalhes: DataTypes.INTEGER
        },
        {
            defaultScope: {
                attributes: {
                    exclude: ["created_at", "updated_at"]
                }
            },
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: "lesao" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = LesaoModel;
