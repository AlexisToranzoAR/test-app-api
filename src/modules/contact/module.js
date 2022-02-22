const ContactController = require("./controller/contactController");
const ContactService = require("./service/contactService");
const ContactRepository = require("./repository/contactRepository");
const ContactModel = require("./model/contactModel");

function initContactModule(app, container) {
  const controller = container.get("ContactController");
  controller.configureRoutes(app);
}

module.exports = {
  ContactController,
  ContactService,
  ContactRepository,
  ContactModel,
  initContactModule,
};
