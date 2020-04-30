"use strict";

const {version} = require("../../../package.json");

module.exports = {

    Executar() {

        const informacoesDoSistema = {
            descricao: "Center for Recognition and Inspection of Cells (CRIC) Database",
            versao: version
        };

        return informacoesDoSistema;
    }
};
