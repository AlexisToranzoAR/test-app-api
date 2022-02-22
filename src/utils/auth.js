const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function createJWT(user) {
  const { id, username } = user;
  return jwt.sign(
    {
      id,
      username,
    },
    jwtSecret
  );
}

module.exports = {
  createJWT,
};
