"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const GeradorIdUnico = require("../../utils/gerador_identificador_unico");
const Criptografia = require("../../utils/criptografia");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const SessaoRepositorio = require("../../repositorios/sessao_repositorio");

module.exports = {

    async Executar(req) {

        const senhaCriptografada = Criptografia.criarCriptografiaMd5Utf8(req.body.senha);
        let usuario = await UsuarioRepositorio.obterUsuarioCompletoPorLogin(
            req.body.email,
            senhaCriptografada
        );
        
        console.log("hey");
        console.log(`user: ${usuario}`);

        if (usuario) {

            let token_autenticacao = GeradorIdUnico.gerarUuidv4();
            const sessaoCriada = await SessaoRepositorio.criarRegistroDeSessao(
                usuario.email,
                token_autenticacao
            ).catch(err => {
                ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
                ObjetoExcecao.title = Excecao.ERRO_INTERNO;
                ObjetoExcecao.detail = `Failed to register new session due ${err}`;
                throw ObjetoExcecao;
            });

            if (sessaoCriada) {
                return {
                    usuario: usuario,
                    token_autenticacao: token_autenticacao
                };
            }
        }

        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }
};