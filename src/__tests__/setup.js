/* eslint global-require: 0 */

module.exports = async () => {
    const UsuarioBaseModel = require("../models/UsuarioBaseModel");
    const AdministradorModel = require("../models/AdministradorModel");
    const AnalistaModel = require("../models/AnalistaModel");

    const UsuarioBaseFixtures = require("../fixtures/user");
    const AdministradorFixtures = require("../fixtures/admin");
    const AnalistaFixtures = require("../fixtures/analyst");

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
            }
        );
};
