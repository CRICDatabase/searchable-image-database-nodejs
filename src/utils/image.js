"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:utils/image");

const ImagemRepositorio = require("../repositorios/imagem_repositorio");

module.exports = {
    async atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes, listaLesoes){

        let higher_grade = 0;
        let injury_id_with_higher_grade = 1;
        listaDeClassificacoes.forEach(celula => {
            listaLesoes.forEach(lesao => {
                if(celula.id_lesao === lesao.id && lesao.grade > higher_grade) {
                    higher_grade = lesao.grade;
                    injury_id_with_higher_grade = celula.id_lesao;
                }
            })
        });       
        return await ImagemRepositorio.atualizarLesaoImagem(id_imagem, injury_id_with_higher_grade);
    }
};
