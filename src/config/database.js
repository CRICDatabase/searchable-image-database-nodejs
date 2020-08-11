'use strict'

//Configura conexao local (manter uma das duas configuracoes sempre comentada)
module.exports = {
    host: 'localhost',
    username: 'root',
    password: 'nve7a3ez',
    database: 'cric_database_2019',
    dialect: 'mysql',
    timezone: '-03:00',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true, //padrao das tabelas formato snake_case        
        timestamps: true, //created_at e updated_at (automatico)
    },
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
    logging: true
}

//configuracao conexao producao (manter uma das duas configuracoes sempre comentada)
/*module.exports = {
    host: 'mysql669.umbler.com',
    username: 'cric_2019',
    password: 'c3bad2fd135f4314bbcf722e7f437c39',
    database: 'cric_database_19',
    dialect: 'mysql',
    timezone: '-03:00',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true, //padrao das tabelas formato snake_case        
        timestamps: true, //created_at e updated_at (automatico)
    },
    pool: {
        max: 50,
        idle: 30000,
        acquire: 60000,
    },
    logging: false
}*/