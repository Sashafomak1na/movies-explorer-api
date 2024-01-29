const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  ERROR_AUTHORIZATION_DATA,
  PASSWORD_PREFIX,
  ERROR_EMAIL,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, ERROR_EMAIL],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select(PASSWORD_PREFIX)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERROR_AUTHORIZATION_DATA);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(ERROR_AUTHORIZATION_DATA);
        }
        return user;
      });
    });
};

exports.User = mongoose.model('user', userSchema);
