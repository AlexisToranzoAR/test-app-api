const { fromDataToEntity } = require("../mapper/contactMapper");
const ContactIdNotDefinedError = require("../error/ContactIdNotDefinedError");

module.exports = class ContactController {
  constructor(contactService) {
    this.ROUTE_BASE = "/contact";
    this.contactService = contactService;
  }

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.post(`${ROUTE}`, this.save.bind(this));
    app.delete(`${ROUTE}/:id`, this.delete.bind(this));
    app.get(`${ROUTE}`, this.getAll.bind(this));
  }

  async save(req, res, next) {
    try {
      const contactData = fromDataToEntity(req.body);

      const savedContact = await this.contactService.save(contactData);

      if (contactData.id) {
        return res.json({
          message: `The contact was updated correctly (ID: ${savedContact.id})`,
          data: savedContact,
        });
      } else {
        return res.json({
          message: `The contact was created correctly (ID: ${savedContact.id})`,
          data: savedContact,
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (!Number(id)) {
        throw new ContactIdNotDefinedError();
      }

      const contact = await this.contactService.getById(id);
      await this.contactService.delete(contact);
      return res.json({
        message: `The contact ${contact.name} was removed (ID: ${id})`,
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const contacts = await this.contactService.getAll();
      return res.json({
        message: "Ok",
        data: contacts,
      });
    } catch (e) {
      next(e);
    }
  }
};
