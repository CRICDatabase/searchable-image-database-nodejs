/* Enable with `export NODE_ENV=production` */

"use strict";

module.exports = {
    domain: "api.database.cric.com.br",
    cors: {
        whitelist: [
            "http://cric.com.br",
            "http://database.cric.com.br",
            "http://api.database.cric.com.br",
            "https://cric.com.br",
            "https://database.cric.com.br",
            "https://api.database.cric.com.br"
        ]
    },
    authorization_seed: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    database: {
        host: "db",
        username: "root",
        password: "123.456",
        database: "cric",
        dialect: "mysql",
        timezone: "-03:00",
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            underscored: true,
            timestamps: true
        },
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000
        },
        logging: false
    },
    nodemailer: {
        host: 'localhost',
        port: 587,
        auth: {
            user: 'youremail@localhost',
            pass: 'yourpassword'
        }
    }
};
