"use strict";

const { Model, DataTypes }  = require("sequelize");

class SessaoUsuarioModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            email: DataTypes.STRING,
            token_autenticacao: DataTypes.STRING
        },
        {
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: "sessao_usuario" //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = SessaoUsuarioModel;