'use strict'

const { Model, DataTypes }  = require('sequelize');

class ImagemModel extends Model {

    //Recebe a conexao com o banco dedados
    static init(connection) {

        super.init({
            nome: DataTypes.STRING,
            codigo_lamina: DataTypes.STRING,
            excluida: DataTypes.INTEGER,
            classificacao_aprovada: DataTypes.INTEGER,
            dt_aquisicao: DataTypes.DATE,
            fonte_aquisicao: DataTypes.INTEGER,
            caminho_imagem: DataTypes.STRING,
            altura: DataTypes.INTEGER,
            largura: DataTypes.INTEGER
        },
        {
            sequelize: connection, //Recebe a conexao com o banco de dados
            tableName: 'imagem' //Evita que o sequelize pesquise pelo nome da tabela no plural
        });
    }

    static associacao(models) {

        this.belongsTo(models.UsuarioBaseModel, {
            foreignKey: 'id_usuario', as: 'fk_imagem_usuario_base'
        });

        this.belongsTo(models.LesaoModel, {
            foreignKey: 'id_lesao', as: 'fk_imagem_lesao'
        });
    }
}

module.exports = ImagemModel;