require("dotenv").config();
const { default: DIContainer, object, use, factory, func } = require("rsdi");
const { Sequelize } = require("sequelize");

const {
  ContactController,
  ContactModel,
  ContactRepository,
  ContactService,
} = require("../modules/contact/module");

function configureSequelizeDatabase() {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mariadb",
    }
  );
}


function addCommonDefinitions(container) {
  container.add({
    Sequelize: factory(configureSequelizeDatabase),
  });
}

function configureContactModel(container) {
  return ContactModel.setup(container.get("Sequelize"));
}

function addContactModuleDefinitions(container) {
  container.add({
    ContactController: object(ContactController).construct(
      use("ContactService")
    ),
    ContactService: object(ContactService).construct(use("ContactRepository")),
    ContactRepository: object(ContactRepository).construct(use("ContactModel")),
    ContactModel: factory(configureContactModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addContactModuleDefinitions(container);
  return container;
};
