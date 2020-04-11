'use strict'

module.exports = {

    converterPontoParaArmazenarNoBanco(parametros) {

        const novoX = (parametros.coord_x * parametros.larguraOriginalImg ) / parametros.larguraCanvas;
        const novoY = (parametros.coord_y * parametros.alturaOriginalImg ) / parametros.alturaCanvas;
        return { coord_x: Math.round(novoX), coord_y: Math.round(novoY) };
    },

    ConverterPontoParaEnviarAoCliente(parametros) {

        const novoX = (parametros.coord_x * parametros.larguraCanvas ) / parametros.larguraOriginalImg;
        const novoY = (parametros.coord_y * parametros.alturaCanvas ) / parametros.alturaOriginalImg;        
        return { coord_x: Math.round(novoX), coord_y: Math.round(novoY) };
    }
}
