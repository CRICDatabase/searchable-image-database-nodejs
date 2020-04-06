'use strict';

const config = require('config');

const Sequelize = require('sequelize');
const Usuario_Base = require('../models/UsuarioBaseModel');
const Administrador = require('../models/AdministradorModel');
const Citopatologista = require('../models/CitopatologistaModel');
const Visitante = require('../models/VisitanteModel');
const Analista = require('../models/AnalistaModel');
const ImagemModel = require('../models/ImagemModel');
const DescricaoModel = require('../models/DescricaoModel');
const CelulaModel = require('../models/CelulaModel');
const LesaoModel = require('../models/LesaoModel');
const ClassificacaoCelulaModel = require('../models/ClassificacaoCelulaModel');
const SegmentacaoCitoplasmaModel = require('../models/SegmentacaoCitoplasmaModel');
const SegmentacaoNucleoModel = require('../models/SegmentacaoNucleoModel');
const SessaoUsuarioModel = require('../models/SessaoUsuarioModel');

// Option 1:
const connection = new Sequelize(config.get('database'));

// Option 2: Passing a connection URI (See more in: https://sequelize.org/v5/manual/getting-started.html)
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

//Inicia a conexao no model (cadastra o model na conexao)
Usuario_Base.init(connection);
Administrador.init(connection);
Citopatologista.init(connection);
Visitante.init(connection);
Analista.init(connection);
ImagemModel.init(connection);
DescricaoModel.init(connection);
CelulaModel.init(connection);
LesaoModel.init(connection);
ClassificacaoCelulaModel.init(connection);
SegmentacaoCitoplasmaModel.init(connection);
SegmentacaoNucleoModel.init(connection);
SessaoUsuarioModel.init(connection);

//habilita as associações de chaves
ImagemModel.associacao(connection.models);
CelulaModel.associacao(connection.models);
ClassificacaoCelulaModel.associacao(connection.models);
SegmentacaoCitoplasmaModel.associacao(connection.models);
SegmentacaoNucleoModel.associacao(connection.models);

module.exports = connection;
