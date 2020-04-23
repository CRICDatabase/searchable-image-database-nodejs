"use strict";

const { Model, DataTypes }  = require("sequelize");

class VisitanteModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            pais: DataTypes.STRING,
            estado_regiao: DataTypes.STRING,
            cidade: DataTypes.STRING
        },
        {
            defaultScope: {
                attributes: {
                    exclude: ["created_at", "updated_at"]
                }
            },
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: "visitante"
        });
    }
}

module.exports = VisitanteModel;
