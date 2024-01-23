const jwt = require('jsonwebtoken');
const secretKey = require('../utils/secretKey');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  PREFIX_FOR_TOKEN,
  ERROR_AUTHORIZATION_DATA,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith(PREFIX_FOR_TOKEN)) {
    throw new UnauthorizedError(ERROR_AUTHORIZATION_DATA);
  }
  const token = authorization.replace(PREFIX_FOR_TOKEN, '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
    console.log(payload);
  } catch (err) {
    throw new UnauthorizedError(ERROR_AUTHORIZATION_DATA);
  }
  req.user = payload;
  return next();
};
