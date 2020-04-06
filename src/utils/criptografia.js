'use strict';

const crypto = require('crypto');

module.exports = {

    criarCriptografiaMd5Utf8(senha) {
        return crypto.createHash('md5').update(senha).digest("hex").toString();
    }
};