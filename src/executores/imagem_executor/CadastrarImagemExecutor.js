'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const FonteAquisicao = require('../../utils/enumeracoes/fonte_aquisicao');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const Crypto = require('crypto');
const FileSystem = require('fs');
const Jimp = require('jimp');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        const imagemCadastrada = await cadastrarDadosEArquivoDeImagem(req);

        if (!imagemCadastrada) {
            //Apagar o arquivo da pasta base_original caso == .tif ou da pasta bae_original caso != .tif
            ObjetoExcecao.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.mensagem = Excecao.ERRO_AO_CADASTRAR_IMAGEM;
            throw ObjetoExcecao;
        }

        await converterSalvarArquivoAtualizarRegistroNoBanco(req, imagemCadastrada.dataValues);    
        //await salvarImagemThumbnail(req);
        return true;
    }
};

async function validarRequisicao(req) {

    if (!req.body.id_usuario || !req.body.id_lesao || !ValidarTipo.ehNumero(req.body.id_usuario) ||
        !ValidarTipo.ehNumero(req.body.id_lesao) || !req.files || !req.body.codigo_lamina ||
        !req.body.codigo_lamina) {
            
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const UsuarioBase = await UsuarioRepositorio.obterUsuarioBasePorId(req.body.id_usuario);
    if (!UsuarioBase) {
        ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
        ObjetoExcecao.mensagem = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    const administradorTask = UsuarioRepositorio.obterAdministradorPorId(req.body.id_usuario);
    const citopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(req.body.id_usuario);
    const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.body.id_usuario);

    const [administrador, citopatologista, visitante] = await Promise.all([administradorTask, citopatologistaTask, visitanteTask]);

    let naoAutorizado = administrador || citopatologista || visitante;
    if (!naoAutorizado) {
        ObjetoExcecao.status_code = HttpStatus.UNAUTHORIZED;
        ObjetoExcecao.mensagem = Excecao.USUARIO_NAO_AUTORIZADO;
        throw ObjetoExcecao;
    }
}

async function prepararCadastroNoBanco(req) {

    let nomeImagemTratado = obterNomeImagemTratado(req.files.file.name);
    const novoNomeImagem = `${Crypto.randomBytes(8).toString('hex')}_${nomeImagemTratado}`; //Cria hexadecimal de 16 bits
    const excluida = 0;
    const classificacao_aprovada = 1;
    const fonte_aquisicao = await obterUsuarioVisitante(req);
    const caminho_imagem = fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA ? 'imagens/base_interna/' : 'imagens/base_externa/' ;    
    const altura = 0;
    const largura = 0;

    const imagem = {
        nome: novoNomeImagem,
        codigo_lamina: req.body.codigo_lamina,
        excluida: excluida,
        classificacao_aprovada: classificacao_aprovada,
        dt_aquisicao: req.body.dt_aquisicao,
        fonte_aquisicao: fonte_aquisicao,
        caminho_imagem: caminho_imagem,
        id_usuario: req.body.id_usuario,
        id_lesao: req.body.id_lesao,
        altura: altura,
        largura: largura
    };

    return imagem;
}

async function obterUsuarioVisitante(req) {

    const viistante = await UsuarioRepositorio.obterVisitantePorId(req.body.id_usuario);
    return viistante ? FonteAquisicao.FONTE_AQUISICAO_EXTERNA : FonteAquisicao.FONTE_AQUISICAO_INTERNA;
}

function obterNomeImagemTratado(entrada) {

    if (typeof entrada !== "string") {
        return entrada.toString().replace(' ', '_');
    }
    return entrada.replace(' ', '_');
}

async function cadastrarDadosEArquivoDeImagem(req) {

    var sistemaWindows = process.platform === "win32";
    let barra = '/'; //para ambiente linux
    if(sistemaWindows) {
 barra = '\\'; 
}
    
    let erroAoSalvar;
    const imagem = await prepararCadastroNoBanco(req);
    const destino = imagem.fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA ? 'base_interna' : 'base_externa';
    const caminho_base_diretorio = __dirname + `${barra}..${barra}..${barra}..${barra}`;

    req.files.file.name = imagem.nome;
    const diretorioUploadImagemOriginal = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}base_original${barra}${imagem.nome}`;
    const diretorioUploadDefinitivo = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}${destino}${barra}${imagem.nome}`;
    const verificarExtensao = req.files.file.mimetype.split('/');
    
    if(verificarExtensao[1] == 'tiff' || verificarExtensao[1] == 'tif') {
        
        const tif = 'tif';
        const png = 'png';
        imagem.nome = imagem.nome.replace(tif, png);
        FileSystem.writeFile(diretorioUploadImagemOriginal, req.files.file.data, (erro) => {
            if (erro) {
                erroAoSalvar = erro;
            }
        });
    }
    else {
        FileSystem.writeFile(diretorioUploadDefinitivo, req.files.file.data, (erro) => {
            if (erro) {
                erroAoSalvar = erro;
            }
        });
    }

    let imagemCadastrada;
    if(!erroAoSalvar) {
        imagemCadastrada = await ImagemRepositorio.cadastrarImagem(imagem);
    }
    else{
        throw erroAoSalvar;
    }

    return imagemCadastrada;
}

async function converterSalvarArquivoAtualizarRegistroNoBanco(req, imagem) {

    var sistemaWindows = process.platform === "win32";
    let barra = '/'; //para ambiente linux
    let imagemLida;
    let imagemAtualizacao;
    const destino = imagem.fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA ? 'base_interna' : 'base_externa';
    if(sistemaWindows) {
 barra = '\\'; 
}

    const verificarExtensao = req.files.file.mimetype.split('/');
    const caminho_base_diretorio = __dirname + `${barra}..${barra}..${barra}..${barra}`;
    let diretorioUploadThumbnail;
    let resultado;

    if(verificarExtensao[1] == 'tiff' || verificarExtensao[1] == 'tif') {
        const tif = 'tif';
        const png = 'png';
        const diretorioUploadImagemOriginal = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}base_original${barra}${req.files.file.name}`;
        const diretorioUploadFinal = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}${destino}${barra}${req.files.file.name.replace(tif, png)}`;

        diretorioUploadThumbnail = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}base_thumbnail${barra}${req.files.file.name.replace(tif, png)}`;

        imagemLida = await Jimp.read(diretorioUploadImagemOriginal);
        imagemAtualizacao = imagem;
        imagemAtualizacao.altura = imagemLida.bitmap.height;
        imagemAtualizacao.largura = imagemLida.bitmap.width;
        resultado = await ImagemRepositorio.atualizarDimensoesImagem(imagem.id, imagem.altura, imagem.largura);
        imagemLida.write(diretorioUploadFinal);

        let imagemRedimensionada = imagemLida.resize(256, 256);
        imagemRedimensionada.write(diretorioUploadThumbnail);
    }
    else {
        const diretorioUploadFinal = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}${destino}${barra}${req.files.file.name}`;

        diretorioUploadThumbnail = `${caminho_base_diretorio}src${barra}assets${barra}imagens${barra}base_thumbnail${barra}${req.files.file.name}`;

        imagemLida = await Jimp.read(diretorioUploadFinal);
        imagemAtualizacao = imagem;
        imagemAtualizacao.altura = imagemLida.bitmap.height;
        imagemAtualizacao.largura = imagemLida.bitmap.width;
        resultado = await ImagemRepositorio.atualizarDimensoesImagem(imagem.id, imagem.altura, imagem.largura);

        let imagemRedimensionada = imagemLida.resize(256, 256);
        imagemRedimensionada.write(diretorioUploadThumbnail);
    }

    return resultado;
}