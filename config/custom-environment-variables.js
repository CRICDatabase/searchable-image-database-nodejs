/* environment variables to be check */

"use strict";

module.exports = {
    authorization_seed: "CRIC_AUTHORIZATION_SEED",
    database: {
        username: "CRIC_DB_USERNAME",
        password: "CRIC_DB_PASSWORD",
    },
    nodemailer: {
        service: "NODEMAILER_SERVICE",
        auth: {
            user: 'NODEMAILER_ADDRESS',
            pass: 'NODEMAILER_PASSWORD'
        }
    }
};

