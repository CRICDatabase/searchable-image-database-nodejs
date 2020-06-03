"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const ListarSegmentacaoCelulaExecutor = require("../imagem_executor/ListarSegmentacaoCelulaExecutor");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        await ImagemRepositorio.excluirSegmentacaoDeCitoplasma(req.params.id_celula);
        await ImagemRepositorio.excluirSegmentacaoDeNucleo(req.params.id_celula, req.params.id_imagem);
        await ImagemRepositorio.excluirCelula(req.params.id_celula, req.params.id_imagem);

        return await ListarSegmentacaoCelulaExecutor.Executar(req);
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem) ||
        !ValidarTipo.ehNumero(req.params.id_celula)) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const administradorTask = UsuarioRepositorio.obterAdministradorPorId(req.params.id_usuario);
    const citopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(req.params.id_usuario);
    const [usuario, imagem, administrador, citopatologista] = await Promise.all([usuarioTask, imagemTask, administradorTask, citopatologistaTask]);

    if (!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (!(administrador || citopatologista)) {
        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        ObjetoExcecao.title = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
        throw ObjetoExcecao;
    }

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }
}