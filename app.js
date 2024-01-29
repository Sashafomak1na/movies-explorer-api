/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const limiter = require('./middlewares/reqLimit');
const route = require('./routes/index');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  CONNECTION_WITH_BD,
  ERROR_CONNECTION_WITH_DB,
  PAGE_NOT_FOUND,
  APP_ON_PORT,
  FRONTEND_SERVER_HOST_HTTP,
  FRONTEND_SERVER_HOST_HTTPS,
} = require('./utils/constants');

const { PORT, DB_ADRESS } = process.env;
const app = express();

app.use(
  cors({
    origin: [
      FRONTEND_SERVER_HOST_HTTP,
      FRONTEND_SERVER_HOST_HTTPS,
    ],
    credentials: true,
    maxAge: 30,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

mongoose
  .connect(DB_ADRESS)
  .then(() => {
    console.log(CONNECTION_WITH_BD);
  })
  .catch(() => {
    console.log(ERROR_CONNECTION_WITH_DB);
  });

app.use(requestLogger);
app.use(limiter);
app.use(route);

app.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${APP_ON_PORT} ${PORT}`);
});
