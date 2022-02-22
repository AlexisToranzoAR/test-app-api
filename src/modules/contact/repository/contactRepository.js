const { fromModelToEntity } = require("../mapper/contactMapper");
const ContactNotDefinedError = require("../error/ContactNotDefinedError");
const ContactIdNotDefinedError = require("../error/ContactIdNotDefinedError");
const ContactNotFoundError = require("../error/ContactNotFoundError");
const Contact = require("../entity/Contact");
const { Op } = require("sequelize");

module.exports = class ContactRepository {
  constructor(contactModel) {
    this.contactModel = contactModel;
  }

  async save(contact) {
    if (!(contact instanceof Contact)) {
      throw new ContactNotDefinedError();
    }

    let contactModel;
    const buildOptions = { isNewRecord: !contact.id };
    contactModel = this.contactModel.build(contact, buildOptions);
    contactModel = await contactModel.save();

    return fromModelToEntity(contactModel);
  }

  async delete(contact) {
    if (!contact || !contact.id) {
      throw new ContactIdNotDefinedError("Contact ID is not defined");
    }

    return Boolean(
      await this.contactModel.destroy({ where: { id: contact.id } })
    );
  }

  async getAll() {
    const contactInstances = await this.contactModel.findAll({});

    return contactInstances.map(fromModelToEntity);
  }

  async getById(contactId) {
    if (!Number(contactId)) {
      throw new ContactIdNotDefinedError();
    }
    const contactInstance = await this.contactModel.findByPk(contactId);
    if (!contactInstance) {
      throw new ContactNotFoundError(
        `There is no existing contact with ID ${contactId}`
      );
    }

    return fromModelToEntity(contactInstance);
  }
};
