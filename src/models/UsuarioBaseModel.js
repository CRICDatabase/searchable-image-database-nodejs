'use strict'

const { Model, DataTypes }  = require('sequelize');

class UsuarioBaseModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            primeiro_nome: DataTypes.STRING,
            ultimo_nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            ativo: DataTypes.INTEGER,
        },
        {
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: 'usuario_base' //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }
}

module.exports = UsuarioBaseModel;