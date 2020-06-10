/* eslint global-require: 0 */

module.exports = async () => {
    const UsuarioBaseModel = require("../models/UsuarioBaseModel");
    const AdministradorModel = require("../models/AdministradorModel");
    const AnalistaModel = require("../models/AnalistaModel");

    const LesaoModel = require("../models/LesaoModel");
    const DescricaoModel = require("../models/DescricaoModel");

    const ImagemModel = require("../models/ImagemModel");

    const UsuarioBaseFixtures = require("../fixtures/user");
    const AdministradorFixtures = require("../fixtures/admin");
    const AnalistaFixtures = require("../fixtures/analyst");

    const LesaoFixtures = require("../fixtures/injury");
    const DescricaoFixtures = require("../fixtures/description");

    const ImagemFixtures = require("../fixtures/image");

    const db = require("../database");

    global.__SEQUELIZE__ = db;

    await db.sync()
        .then(
            async () => {
                await UsuarioBaseModel.bulkCreate(
                    UsuarioBaseFixtures.fixtures
                );

                await AdministradorModel.bulkCreate(
                    AdministradorFixtures.fixtures
                );

                await AnalistaModel.bulkCreate(
                    AnalistaFixtures.fixtures
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
            }
        );
};
