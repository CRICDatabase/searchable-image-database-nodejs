"use strict";

const { Model, DataTypes }  = require("sequelize");

class DescricaoModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            codigo: DataTypes.INTEGER,
            nome: DataTypes.STRING
        },
        {
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: "descricao" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = DescricaoModel;