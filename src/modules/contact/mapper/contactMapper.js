const Contact = require("../entity/Contact");

function fromDataToEntity({
  id,
  firstName,
  lastName,
  email,
  phone,
  message,
}) {
  return new Contact({
    id,
    firstName,
    lastName,
    email,
    phone,
    message,
  });
}

function fromModelToEntity(model) {
  const modelJson = model.toJSON();
  return new Contact(modelJson);
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
