module.exports = async () => {
    await global.__SEQUELIZE__.drop();
    await global.__SEQUELIZE__.close();
};
