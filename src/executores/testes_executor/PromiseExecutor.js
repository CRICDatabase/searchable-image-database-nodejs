'use strict';

const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');

module.exports = {

    async Executar(req) {

        //Implementação que aguarda a resoluçao da promise
        await definirDelayPromise(1000);
        console.log(1);
        return 1;
    }
};


//Cria uma Promise
function definirDelayPromise(tempo) {
    
    console.log('definirDelayPromise()');
    return new Promise((resolve, reject) => {

        //Esse if ta tando um erro doido. Mas quando cai no else funciona de boa
        if(tempo < 500) {
            reject(new Error('Valor de delay inválido'));
        }
        else{
            setTimeout(resolve, tempo);
        }        
    });
}
