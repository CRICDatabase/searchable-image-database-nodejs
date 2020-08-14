"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:get_user_middleware");

const HttpStatus = require("http-status-codes");

module.exports = {

    async login_required(req, res, next) {
        if (typeof res.locals.user === "undefined") {
            return res.status(HttpStatus.UNAUTHORIZED).end();
        }
        else {
            next();
        }
    }
};
