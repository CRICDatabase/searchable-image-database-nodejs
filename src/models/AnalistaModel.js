"use strict";

const { Model, DataTypes }  = require("sequelize");

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
