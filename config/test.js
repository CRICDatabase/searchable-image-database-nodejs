"use strict";

module.exports = {
    database: {
        host: "db",
        username: "root",
        password: "123.456",
        database: "jest",
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
};
