"use strict";

const { Model, DataTypes }  = require("sequelize");

class AdministradorModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            api_key: DataTypes.STRING,
            nivel_acesso: DataTypes.STRING
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
            tableName: "administrador"
        });
    }
}

module.exports = AdministradorModel;
