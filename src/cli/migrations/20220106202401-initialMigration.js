const ContactModel = require("../../modules/contact/model/contactModel");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      ContactModel.setup(queryInterface.sequelize),

      ContactModel.sync(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("contacts", { cascade: true });
  },
};
