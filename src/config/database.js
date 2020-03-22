'use strict'

module.exports = {
    host: 'db',
    username: 'root',
    password: '123.456',
    database: 'cric',
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 1000}, // mariadb connector option
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
    logging: false
}