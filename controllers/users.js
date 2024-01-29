const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/user');
const secretKey = require('../utils/secretKey');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const {
  CONFLICT_ERROR,
  VALIDATION_ERROR,
  USER_NOT_FOUND,
  ERROR_USER_ID,
  E11000,
  PASSWORD_PREFIX,
  CAST_ERROR,
  USER_EMAIL_EXISTS,
  ERROR_DATA_UPDATE_USER,
  ERROR_DATA_CREATE_USER,
  ERROR_AUTHORIZATION_DATA,
  AUTHORIZATION,
} = require('../utils/constants');

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((data) => {
      if (!data) {
        next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(ERROR_USER_ID));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CONFLICT_ERROR) {
        next(new ConflictError(USER_EMAIL_EXISTS));
      }
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(ERROR_DATA_UPDATE_USER));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({ name: user.name, email: user.email, id: user.id }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(ERROR_DATA_CREATE_USER));
      }
      if (err.code === E11000) {
        next(new ConflictError(USER_EMAIL_EXISTS));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select(PASSWORD_PREFIX)
    .orFail(() => new UnauthorizedError(ERROR_AUTHORIZATION_DATA))
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((matched) => {
        if (matched) {
          const token = jwt.sign({ _id: user._id }, secretKey);
          return res.status(200).send({ token, message: AUTHORIZATION });
        }
        return next(new UnauthorizedError(ERROR_AUTHORIZATION_DATA));
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUserInfo,
  updateUserInfo,
  login,
};
