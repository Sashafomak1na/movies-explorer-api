const reqLimit = require('express-rate-limit');

const limit = reqLimit({
  max: 160,
  windowMS: 55000,
  message: 'Превышен лимит запросов повторите попытку через несколько минут',
});

module.exports = limit;
