"use strict";

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

module.exports = {
    async function atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes){

        let higher_grade = 0;
        let injury_id_with_higher_grade = 1;
        listaDeClassificacoes.forEach(celula => {
            if(celula.lesao.grade > higher_grade) {
                higher_grade = celula.lesao.grade;
                injury_id_with_higher_grade = celula.lesao.id;
            }
        });
        return ImagemRepositorio.atualizarLesaoImagem(id_imagem, injury_id_with_higher_grade);
    }
};
