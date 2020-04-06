'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const ObterImagemExecutor = require('../../executores/imagem_executor/ObterImagemExecutor');
const ListarClassificacaoCelulaExecutor = require('../imagem_executor/ListarClassificacaoCelulaExecutor');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);

        let requisicao = {
            id_imagem: req.params.id_imagem,
            id_usuario: req.params.id_usuario,
            codigo_lamina: req.body.codigo_lamina,
            dt_aquisicao: req.body.dt_aquisicao,
            id_lesao_celula: req.body.id_lesao_celula,
            id_celula: req.body.id_celula
        };

        const atualizarImagemTask = ImagemRepositorio.atualizarImagem(requisicao);
        const atualizarCelulaTask = ImagemRepositorio.atualizarCelula(requisicao);
        await Promise.all([atualizarImagemTask, atualizarCelulaTask]);
        
        const listaDeClassificacoes = await ListarClassificacaoCelulaExecutor.Executar(req);
        await atualizarLesaoMaisGraveNaImagem(requisicao.id_imagem, listaDeClassificacoes);
        return await ObterImagemExecutor.Executar(req);
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem) ||
        !req.body.codigo_lamina || !req.body.dt_aquisicao || !ValidarTipo.ehNumero(req.body.id_lesao_celula) ||
        !ValidarTipo.ehNumero(req.body.id_celula)) {

        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const analistaTask = UsuarioRepositorio.obterAnalistaPorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const celulaTask = ImagemRepositorio.obterCelulaPorId(req.body.id_celula);
    const [usuario, analista, imagem, celula] = await Promise.all([usuarioTask, analistaTask, imagemTask, celulaTask]);

    if (!usuario) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (!analista) {
        ObjetoExcecao.status_code = HttpStatus.FORBIDDEN;
        ObjetoExcecao.mensagem = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
        throw ObjetoExcecao;
    }

    if (!imagem) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if(!celula) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.CELULA_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }
}

async function atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes) {

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