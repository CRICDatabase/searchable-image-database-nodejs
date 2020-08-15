"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:CadastrarImagemExecutor");

const Crypto = require("crypto");
const FileSystem = require("fs");
const HttpStatus = require("http-status-codes");
const Jimp = require("jimp");
const path = require("path");
const validator = require('validator');

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req, res.locals.user);

        const imagemCadastrada = await cadastrarDadosEArquivoDeImagem(req);

        if (!imagemCadastrada) {
            ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
            ObjetoExcecao.title = Excecao.ERRO_AO_CADASTRAR_IMAGEM;
            ObjetoExcecao.detail = "Failed to register a image";
            throw ObjetoExcecao;
        }

        await converterSalvarArquivoAtualizarRegistroNoBanco(imagemCadastrada.dataValues);
        return await prepararRetorno(imagemCadastrada);
    }
};

async function validarRequisicao(req, user) {
    if (!req.body.id_usuario || !validator.isNumeric(req.body.id_usuario) ||
        !req.body.codigo_lamina || !validator.isAlphanumeric(req.body.codigo_lamina) ||
        !req.body.dt_aquisicao || !validator.isDate(req.body.dt_aquisicao)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Check id_usuario, codigo_lamina, dt_aquisicao";
        throw ObjetoExcecao;
    }
    if (!req.files) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Missing image file";
        throw ObjetoExcecao;
    }

    if (user.admin || user.id === Number(req.body.id_usuario)) {
        const UsuarioBase = await UsuarioRepositorio.obterUsuarioBasePorId(req.body.id_usuario);
        if (!UsuarioBase) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
            throw ObjetoExcecao;
        }
    }
    else {
        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
        ObjetoExcecao.detail = "Token doesn't belong to required user";
        throw ObjetoExcecao;
    }
}

async function prepararCadastroNoBanco(req) {

    const novoNomeImagem = `${Crypto.randomBytes(8).toString("hex")}.png`; //Cria hexadecimal de 16 bits
    const excluida = 0;
    const classificacao_aprovada = 1;
    const altura = 0;
    const largura = 0;

    debug(req.body.dt_aquisicao);
    const imagem = {
        nome: novoNomeImagem,
        codigo_lamina: req.body.codigo_lamina,
        excluida: excluida,
        classificacao_aprovada: classificacao_aprovada,
        dt_aquisicao: req.body.dt_aquisicao,
        id_usuario: req.body.id_usuario,
        id_lesao: req.body.id_lesao,
        altura: altura,
        largura: largura
    };

    return imagem;
}

async function cadastrarDadosEArquivoDeImagem(req) {
    
    let erroAoSalvar;
    const imagem = await prepararCadastroNoBanco(req);
    req.files.file.name = imagem.nome;

    const caminho_base_diretorio = path.join(
        __dirname,
        "..",
        "..",
        ".."
    );
    let diretorioUploadDefinitivo = path.join(
        caminho_base_diretorio,
        "src",
        "assets",
        "imagens",
        "png",
        imagem.nome
    );
    const filename_parts = imagem.nome.split(".");
    const filename_extension = filename_parts[filename_parts.length - 1];

    FileSystem.writeFile(
        diretorioUploadDefinitivo,
        req.files.file.data,
        {
            flags: "wx"       // fails if the path exists
        },
        (erro) => {
            if (erro) {
                debug(`Fail to write ${diretorioUploadDefinitivo}`);
                erroAoSalvar = erro;
            }
        }
    );

    /* Gecko and WebKit does NOT support TIFF, so we will convert to PNG */
    if(filename_extension.toLowerCase() !== "png") {
        Jimp.read(diretorioUploadDefinitivo)
            .then((image) => {
                return image
                    .writeAsync(
                        diretorioUploadDefinitivo.replace(
                            filename_extension,
                            "png"
                        )
                    ).then(
                        () => {
                            debug("Image converted to PNG");
                        }
                    ).catch(
                        (err) => {
                            debug(err);
                        }
                    );
            })
            .catch((err) => {
                debug(`Cound not read file because ${err}`);
            });

        imagem.nome = imagem.nome.replace(
            filename_extension,
            "png"
        );
    }

    if(erroAoSalvar) {
        throw erroAoSalvar;
    }
    return await ImagemRepositorio.cadastrarImagem(imagem);
}

async function converterSalvarArquivoAtualizarRegistroNoBanco(imagem) {
    let imagemLida;
    let imagemAtualizacao;

    const caminho_base_diretorio = path.join(
        __dirname,
        "..",
        "..",
        ".."
    );
    const diretorioUploadFinal = path.join(
        caminho_base_diretorio,
        "src",
        "assets",
        "imagens",
        "png",
        imagem.nome
    );
    const diretorioUploadThumbnail = path.join(
        caminho_base_diretorio,
        "src",
        "assets",
        "imagens",
        "thumbnail",
        imagem.nome
    );

    imagemLida = await Jimp.read(diretorioUploadFinal);

    imagemAtualizacao = imagem;
    imagemAtualizacao.altura = imagemLida.bitmap.height;
    imagemAtualizacao.largura = imagemLida.bitmap.width;
    await ImagemRepositorio.atualizarDimensoesImagem(
        imagem.id,
        imagem.altura,
        imagem.largura
    );

    // Thumbnail
    imagemLida.scaleToFit(
        256,
        256
    ).writeAsync(
        diretorioUploadThumbnail
    ).then(
        () => {
            debug(`${diretorioUploadThumbnail} created with success`);
        }
    ).catch(
        (err) => {
            debug(err);
        }
    );
}

async function prepararRetorno(imagem) {

    let resultado = {
        ...imagem.dataValues
    };

    resultado.lesao = await ImagemRepositorio.obterLesaoPorId(
        resultado.id_lesao
    );

    resultado.usuario = await UsuarioRepositorio.obterUsuarioBasePorId(
        resultado.id_usuario
    );

    delete resultado.id_lesao;
    delete resultado.id_usuario;

    return resultado;
}
