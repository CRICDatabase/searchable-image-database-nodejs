/* eslint global-require: 0 */

module.exports = async () => {
    const UsuarioBaseModel = require("../models/UsuarioBaseModel");

    const LesaoModel = require("../models/LesaoModel");
    const DescricaoModel = require("../models/DescricaoModel");

    const ImagemModel = require("../models/ImagemModel");

    const ClassificacaoCelulaModel = require("../models/ClassificacaoCelulaModel");

    const CelulaModel = require("../models/CelulaModel");
    const SegmentacaoCitoplasmaModel = require("../models/SegmentacaoCitoplasmaModel");
    const SegmentacaoNucleoModel = require("../models/SegmentacaoNucleoModel");

    const UsuarioBaseFixtures = require("../fixtures/user.json");

    const LesaoFixtures = require("../fixtures/injury.json");
    const DescricaoFixtures = require("../fixtures/description.json");

    const ImagemFixtures = require("../fixtures/image.json");
    const ImagemExtraFixtures = require("../fixtures/image_extra.json");

    const ClassificacaoCelulaFixtures = require("../fixtures/classification.json");

    const CelulaFixtures = require("../fixtures/cell.json");
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
                await ImagemModel.bulkCreate(
                    ImagemExtraFixtures
                );

                await ClassificacaoCelulaModel.bulkCreate(
                    ClassificacaoCelulaFixtures
                );

                await CelulaModel.bulkCreate(
                    CelulaFixtures
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
