"use strict";

const {version} = require("../../../package.json");

module.exports = {

    Executar() {
        return {
            descricao: "Center for Recognition and Inspection of Cells (CRIC) Database",
            versao: version
        };
    }
};
