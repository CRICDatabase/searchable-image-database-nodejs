"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const ObterImagemExecutor = require("../../executores/imagem_executor/ObterImagemExecutor");
const ListarClassificacaoCelulaExecutor = require("../imagem_executor/ListarClassificacaoCelulaExecutor");

module.exports = {

    async Executar(req) {
        await validarRequisicao(req);

        const id_celula = Number(req.params.id_celula);
        const id_imagem = Number(req.params.id_celula);

        await ImagemRepositorio.excluirClassificacaoDeCelula(id_celula);
        await ImagemRepositorio.excluirCelula(
            id_celula,
            id_imagem
        );

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        await atualizarLesaoMaisGraveNaImagem(
            id_imagem,
            todasClassificacoes
        );
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_imagem) ||
        !ValidarTipo.ehNumero(req.params.id_celula)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = `Verify route parameters:\n\t- id_imagem: ${req.params.id_imagem}\n\t- id_celula: ${req.params.id_celula}`;
        throw ObjetoExcecao;
    }

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [imagem] = await Promise.all([imagemTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }
    await ValidadorDeSessao.login_required(req, imagem.id_usuario);
}

async function atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes){
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
