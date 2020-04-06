'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const ObterImagemExecutor = require('../../executores/imagem_executor/ObterImagemExecutor');
const ListarClassificacaoCelulaExecutor = require('../imagem_executor/ListarClassificacaoCelulaExecutor');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);

        await ImagemRepositorio.excluirClassificacaoDeCelula(req.params.id_celula);
        await ImagemRepositorio.excluirCelula(req.params.id_celula, req.params.id_imagem);
        const listaDeClassificacoes = await ListarClassificacaoCelulaExecutor.Executar(req);
        await atualizarLesaoMaisGraveNaImagem(req.params.id_imagem, listaDeClassificacoes);
        
        return await ObterImagemExecutor.Executar(req);
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem) ||
        !ValidarTipo.ehNumero(req.params.id_celula)) {

        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const administradorTask = UsuarioRepositorio.obterAdministradorPorId(req.params.id_usuario);
    const citopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(req.params.id_usuario);
    const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.params.id_usuario);
    const [usuario, imagem, administrador, citopatologista, visitante] = await Promise.all([usuarioTask, imagemTask, administradorTask, citopatologistaTask, visitanteTask]);

    if (!usuario) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (!(administrador || citopatologista || visitante)) {
        ObjetoExcecao.status_code = HttpStatus.FORBIDDEN;
        ObjetoExcecao.mensagem = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
        throw ObjetoExcecao;
    }

    if (!imagem) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }
}

async function atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes){

    if(listaDeClassificacoes.celulas.length > 0) {

        let idLesaoMaisGrave = 1;
        listaDeClassificacoes.celulas.forEach(celula => {
            if(celula.lesao.id > idLesaoMaisGrave) {
                idLesaoMaisGrave = celula.lesao.id;
            }
        });

        return ImagemRepositorio.atualizarLesaoImagem(id_imagem, idLesaoMaisGrave);
    }
}