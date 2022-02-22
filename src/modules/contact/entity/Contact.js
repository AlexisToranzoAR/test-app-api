module.exports = class Contact {
  constructor({
    id,
    firstName,
    lastName,
    email,
    phone,
    message,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
};
