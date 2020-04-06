"use strict";

module.exports = {

    ehNumero(numero) {
        return !Number.isNaN(Number(numero)) && numero !== null && numero !== "";
    }
};