const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/unauthorizedError');
const { URL_REGEX } = require('../utils/constants');

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
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: 'Введен некорректный URL',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }
      return bcrypt
        .compare(password, user.password)

        .then((matched) => {
          if (!matched) {
            return Promise.reject(
              new UnauthorizedError('Неправильные почта или пароль'),
            );
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
