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

    const UsuarioBaseFixtures = require("../fixtures/user.json");

    const LesaoFixtures = require("../fixtures/injury.json");
    const DescricaoFixtures = require("../fixtures/description.json");

    const ImagemFixtures = require("../fixtures/image.json");

    const CelulaFixtures = require("../fixtures/cell.json");
    const ClassificacaoCelulaFixtures = require("../fixtures/classification.json");
    const SegmentacaoCitoplasmaFixtures = require("../fixtures/cytoplasm.json");
    const SegmentacaoNucleoFixtures = require("../fixtures/nucleus.json");


    const db = require("../database");

    global.__SEQUELIZE__ = db;

    await db.sync()
        .then(
            async () => {
                await UsuarioBaseModel.bulkCreate(
                    UsuarioBaseFixtures
                );

                await LesaoModel.bulkCreate(
                    LesaoFixtures
                );

                await DescricaoModel.bulkCreate(
                    DescricaoFixtures
                );

                await ImagemModel.bulkCreate(
                    ImagemFixtures
                );

                await CelulaModel.bulkCreate(
                    CelulaFixtures
                );

                await ClassificacaoCelulaModel.bulkCreate(
                    ClassificacaoCelulaFixtures
                );

                await SegmentacaoCitoplasmaModel.bulkCreate(
                    SegmentacaoCitoplasmaFixtures
                );

                await SegmentacaoNucleoModel.bulkCreate(
                    SegmentacaoNucleoFixtures
                );
            }
        );
};
