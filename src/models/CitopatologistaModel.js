'use strict'

const { Model, DataTypes }  = require('sequelize');

class CitopatologistaModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            codigo_crc: DataTypes.STRING  /* User's license to provide diagnostic */
        },
        {
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: 'citopatologista'
        });
    }
}

module.exports = CitopatologistaModel;
