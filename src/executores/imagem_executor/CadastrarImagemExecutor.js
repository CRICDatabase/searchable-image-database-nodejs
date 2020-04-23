"use strict";

const path = require("path");
const Crypto = require("crypto");
const FileSystem = require("fs");
const Jimp = require("jimp");
const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const FonteAquisicao = require("../../utils/enumeracoes/fonte_aquisicao");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);
        const imagemCadastrada = await cadastrarDadosEArquivoDeImagem(req);

        if (!imagemCadastrada) {
            //Apagar o arquivo da pasta base_original caso == .tif ou da pasta bae_original caso != .tif
            ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.title = Excecao.ERRO_AO_CADASTRAR_IMAGEM;
            throw ObjetoExcecao;
        }

        await converterSalvarArquivoAtualizarRegistroNoBanco(req, imagemCadastrada.dataValues);    
        return imagemCadastrada;
    }
};

async function validarRequisicao(req) {
    if (!req.body.id_usuario || !req.body.id_lesao ||
        !ValidarTipo.ehNumero(req.body.id_usuario) || !ValidarTipo.ehNumero(req.body.id_lesao) ||
        !req.body.codigo_lamina ) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Check id_usuario, id_lesao and codigo_lamina";
        throw ObjetoExcecao;
    }
    if (!req.files) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Missing image file";
        throw ObjetoExcecao;
    }

    const UsuarioBase = await UsuarioRepositorio.obterUsuarioBasePorId(req.body.id_usuario);
    if (!UsuarioBase) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    const administradorTask = UsuarioRepositorio.obterAdministradorPorId(req.body.id_usuario);
    const citopatologistaTask = UsuarioRepositorio.obterCitopatologistaPorId(req.body.id_usuario);
    const visitanteTask = UsuarioRepositorio.obterVisitantePorId(req.body.id_usuario);

    const [administrador, citopatologista, visitante] = await Promise.all([administradorTask, citopatologistaTask, visitanteTask]);

    let naoAutorizado = administrador || citopatologista || visitante;
    if (!naoAutorizado) {
        ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
        ObjetoExcecao.title = Excecao.USUARIO_NAO_AUTORIZADO;
        throw ObjetoExcecao;
    }
}

async function prepararCadastroNoBanco(req) {

    let nomeImagemTratado = obterNomeImagemTratado(req.files.file.name);
    const novoNomeImagem = `${Crypto.randomBytes(8).toString("hex")}_${nomeImagemTratado}`; //Cria hexadecimal de 16 bits
    const excluida = 0;
    const classificacao_aprovada = 1;
    const fonte_aquisicao = await obterUsuarioVisitante(req);
    const caminho_imagem = fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA ? "imagens/base_interna/" : "imagens/base_externa/" ;    
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

    const vistante = await UsuarioRepositorio.obterVisitantePorId(req.body.id_usuario);
    return vistante ? FonteAquisicao.FONTE_AQUISICAO_EXTERNA : FonteAquisicao.FONTE_AQUISICAO_INTERNA;
}

function obterNomeImagemTratado(entrada) {

    if (typeof entrada !== "string") {
        return entrada.toString().replace(" ", "_");
    }
    return entrada.replace(" ", "_");
}

async function cadastrarDadosEArquivoDeImagem(req) {
    
    let erroAoSalvar;
    const imagem = await prepararCadastroNoBanco(req);
    const destino = imagem.fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA ? "base_interna" : "base_externa";
    const caminho_base_diretorio = path.join(
        __dirname,
        "..",
        "..",
        ".."
    );

    req.files.file.name = imagem.nome;
    let diretorioUploadDefinitivo = path.join(
        caminho_base_diretorio,
        "src",
        "assets",
        "imagens",
        destino,
        imagem.nome
    );
    const filename_parts = imagem.nome.split(".");
    const filename_extension = filename_parts[filename_parts.length - 1];

    FileSystem.writeFile(
        diretorioUploadDefinitivo,
        req.files.file.data,
        (erro) => {
            if (erro) {
                erroAoSalvar = erro;
            }
        }
    );

    /* Gecko and WebKit does NOT support TIFF, so we will convert to PNG */
    if(filename_extension == "tiff" || filename_extension == "tif") {
        Jimp.read(diretorioUploadDefinitivo)
            .then((image) => {
                return image
                    .write(
                        diretorioUploadDefinitivo.replace(
                            filename_extension,
                            "png"
                        )
                    );
            })
            .catch((err) => {
                console.error(`Cound not read file because ${err}`);
            });

        imagem.nome = imagem.nome.replace(
            filename_extension,
            "png"
        );
        diretorioUploadDefinitivo = diretorioUploadDefinitivo.replace(
            filename_extension,
            "png"
        );
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

    let imagemLida;
    let imagemAtualizacao;
    const destino = imagem.fonte_aquisicao == FonteAquisicao.FONTE_AQUISICAO_INTERNA ? "base_interna" : "base_externa";

    const filename_parts = imagem.nome.split(".");
    const filename_extension = filename_parts[filename_parts.length - 1];

    const caminho_base_diretorio = path.join(
        __dirname,
        "..",
        "..",
        ".."
    );
    let diretorioUploadThumbnail;
    let resultado;

    if(filename_extension == "tiff" || filename_extension == "tif") {
        const diretorioUploadImagemOriginal = path.join(
            caminho_base_diretorio,
            "src",
            "assets",
            "imagens",
            "base_original",
            req.files.file.name
        );
        const diretorioUploadFinal = path.join(
            caminho_base_diretorio,
            "src",
            "assets",
            "imagens",
            destino,
            req.files.file.name.replace(filename_extension, "png")
        );
        const diretorioUploadThumbnail = path.join(
            caminho_base_diretorio,
            "src",
            "assets",
            "imagens",
            base_thumbnail,
            req.files.file.name.replace(filename_extension, "png")
        );

        imagemLida = await Jimp.read(diretorioUploadImagemOriginal);
        imagemAtualizacao = imagem;
        imagemAtualizacao.altura = imagemLida.bitmap.height;
        imagemAtualizacao.largura = imagemLida.bitmap.width;
        resultado = await ImagemRepositorio.atualizarDimensoesImagem(imagem.id, imagem.altura, imagem.largura);
        imagemLida.write(diretorioUploadFinal);

        let imagemRedimensionada = imagemLida.scaleToFit(256, 256);
        imagemRedimensionada.write(diretorioUploadThumbnail);
    }
    else {
        const diretorioUploadFinal = path.join(
            caminho_base_diretorio,
            "src",
            "assets",
            "imagens",
            destino,
            req.files.file.name
        );
        const diretorioUploadThumbnail = path.join(
            caminho_base_diretorio,
            "src",
            "assets",
            "imagens",
            base_thumbnail,
            req.files.file.name
        );

        imagemLida = await Jimp.read(diretorioUploadFinal);
        imagemAtualizacao = imagem;
        imagemAtualizacao.altura = imagemLida.bitmap.height;
        imagemAtualizacao.largura = imagemLida.bitmap.width;
        resultado = await ImagemRepositorio.atualizarDimensoesImagem(imagem.id, imagem.altura, imagem.largura);

        let imagemRedimensionada = imagemLida.scaleToFit(256, 256);
        imagemRedimensionada.write(diretorioUploadThumbnail);
    }

    return resultado;
}
