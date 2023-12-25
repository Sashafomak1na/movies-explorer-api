const router = require('express').Router();
const { validateChangeUserInfo } = require('../utils/validation');
const {
  updateUserInfo, getCurrentUserInfo,
} = require('../controllers/users');

router.patch('/users/me', validateChangeUserInfo, updateUserInfo);

router.get('/users/me', getCurrentUserInfo);

module.exports = router;
