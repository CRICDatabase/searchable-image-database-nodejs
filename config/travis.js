"use strict";

module.exports = {
    database: {
        host: "127.0.0.1",
        username: "root",
        password: "",
        database: "jest",
        dialect: "mysql",
        timezone: "-03:00",
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            underscored: true,
            timestamps: true,
        },
        query: {
            raw: true
        },
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000
        },
        logging: false
    },
};
