"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:utils/image");

const ImagemRepositorio = require("../repositorios/imagem_repositorio");

module.exports = {
    async atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes){

        let higher_grade = 0;
        let injury_id_with_higher_grade = 1;
        listaDeClassificacoes.forEach(celula => {
            if(celula.lesao_grade > higher_grade) {
                higher_grade = celula.lesao_grade;
                injury_id_with_higher_grade = celula.id_lesao;
            }
        });
        return ImagemRepositorio.atualizarLesaoImagem(id_imagem, injury_id_with_higher_grade);
    }
};
