"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const TipoLesao = require("../../utils/enumeracoes/tipo_lesao");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);

        const lesaoNormal = TipoLesao.NORMAL, nomeLesaoNormal = "Normal";
        const lesaoAscUs = TipoLesao.ASC_US, nomeLesaoASCUS = "AscUs";
        const lesaoLSil = TipoLesao.LSIL, nomeLesaoLSil = "LSil";
        const lesaoAscH = TipoLesao.ASC_H, nomeLesaoAscH = "AscH";
        const lesaoHSil = TipoLesao.HSIL, nomeLesaoHSil = "Hsil";
        const lesaoCarcinoma = TipoLesao.CARCINOMA, nomeLesaoCarcinoma = "Carcinoma";

        const totalNormalTask = obterTotalLesoesPorNome(lesaoNormal, nomeLesaoNormal);
        const totalAscUstask = obterTotalLesoesPorNome(lesaoAscUs, nomeLesaoASCUS);
        const totalLSilTask = obterTotalLesoesPorNome(lesaoLSil, nomeLesaoLSil);
        const totalAscHTask = obterTotalLesoesPorNome(lesaoAscH, nomeLesaoAscH);
        const totalHSilTask = obterTotalLesoesPorNome(lesaoHSil, nomeLesaoHSil);
        const totalCarcinomaTask = obterTotalLesoesPorNome(lesaoCarcinoma, nomeLesaoCarcinoma);

        const [totalNormal, totalAscUs, totalLSil, totalAscH, totalHSil, totalCarcinoma] =
            await Promise.all([totalNormalTask, totalAscUstask, totalLSilTask, totalAscHTask, totalHSilTask, totalCarcinomaTask]);


        const resultado = {
            Normal: totalNormal[0].Normal,
            AscUs: totalAscUs[0].AscUs,
            LSil: totalLSil[0].LSil,
            AscH: totalAscH[0].AscH,
            HSil: totalHSil[0].Hsil,
            Carcinoma: totalCarcinoma[0].Carcinoma
        };

        return resultado;
    }
};

async function obterTotalLesoesPorNome(nomeLesao, nomePropriedade) {

    const QUERY_OBTER_TOTAL_LESAO_NORMAL = `
        SELECT COUNT(lesao.nome) AS ${nomePropriedade} from celula
        JOIN lesao on celula.id_lesao = lesao.id
        WHERE lesao.nome = \"${nomeLesao}\"
    `;

    return await ImagemRepositorio.processarQuerySql(QUERY_OBTER_TOTAL_LESAO_NORMAL);
}