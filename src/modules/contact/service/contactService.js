const ContactIdNotDefinedError = require("../error/ContactIdNotDefinedError");
const ContactNotDefinedError = require("../error/ContactNotDefinedError");
const Contact = require("../entity/Contact");

module.exports = class ContactService {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async save(contact) {
    if (!(contact instanceof Contact)) {
      throw new ContactNotDefinedError();
    }
    return this.contactRepository.save(contact);
  }

  async delete(contact) {
    if (!(contact instanceof Contact)) {
      throw new ContactNotDefinedError();
    }
    return this.contactRepository.delete(contact);
  }

  async getAll() {
    return this.contactRepository.getAll();
  }

  async getById(contactId) {
    if (!Number(contactId)) {
      throw new ContactIdNotDefinedError();
    }
    return this.contactRepository.getById(contactId);
  }
};
