/* eslint global-require: 0 */

module.exports = async () => {
    const UsuarioBaseModel = require("../models/UsuarioBaseModel");

    const LesaoModel = require("../models/LesaoModel");
    const DescricaoModel = require("../models/DescricaoModel");

    const ImagemModel = require("../models/ImagemModel");

    const CelulaModel = require("../models/CelulaModel");
    const ClassificacaoCelulaModel = require("../models/ClassificacaoCelulaModel");
    const SegmentacaoCitoplasmaModel = require("../models/SegmentacaoCitoplasmaModel");
    const SegmentacaoNucleoModel = require("../models/SegmentacaoNucleoModel");

    const UsuarioBaseFixtures = require("../fixtures/user");

    const LesaoFixtures = require("../fixtures/injury");
    const DescricaoFixtures = require("../fixtures/description");

    const ImagemFixtures = require("../fixtures/image");

    const CelulaFixtures = require("../fixtures/cell");
    const ClassificacaoCelulaFixtures = require("../fixtures/classification");
    const SegmentacaoCitoplasmaFixtures = require("../fixtures/cytoplasm");
    const SegmentacaoNucleoFixtures = require("../fixtures/nucleus");


    const db = require("../database");

    global.__SEQUELIZE__ = db;

    await db.sync()
        .then(
            async () => {
                await UsuarioBaseModel.bulkCreate(
                    UsuarioBaseFixtures.fixtures
                );

                await LesaoModel.bulkCreate(
                    LesaoFixtures.fixtures
                );

                await DescricaoModel.bulkCreate(
                    DescricaoFixtures.fixtures
                );

                await ImagemModel.bulkCreate(
                    ImagemFixtures.fixtures
                );

                await CelulaModel.bulkCreate(
                    CelulaFixtures.fixtures
                );

                await ClassificacaoCelulaModel.bulkCreate(
                    ClassificacaoCelulaFixtures.fixtures
                );

                await SegmentacaoCitoplasmaModel.bulkCreate(
                    SegmentacaoCitoplasmaFixtures.fixtures
                );

                await SegmentacaoNucleoModel.bulkCreate(
                    SegmentacaoNucleoFixtures.fixtures
                );
            }
        );
};
