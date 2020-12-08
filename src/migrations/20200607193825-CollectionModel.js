'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("collection",
      {
        id:{
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        slang:{
          type: Sequelize.STRING (150),
          allowNull: false,
        },

        name:{
          type: Sequelize.STRING (45),
          allowNull: false,
        },

        description:{
          type: Sequelize.STRING (300),
          allowNull: false
        },

        public:{
          type: Sequelize.BOOLEAN,
          allowNull: false
        },

        owner:{
          type: Sequelize.BIGINT,
          allowNull: false,
          references: { model: "usuario_base", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
        }
      },
      {
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    )
    .then(
      () => {
          return queryInterface.bulkInsert('collection',
            [
              {
                name: 'Cervix',
                description: 'This Image represent the cytopathologist of the uterine cervix using conventional smear (Pap smear). The Epithelial cell abonormalities (lesion) are adressed in six classes according to Bethesda System.',
                slang: 'cervix',
                public: true,
                owner: 1
              }
            ]
          );
      }
    )
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable("collection");
  }
};
