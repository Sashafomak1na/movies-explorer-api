const router = require('express').Router();
const routeSignup = require('./signup');
const routeSignin = require('./signin');
const routeUsers = require('./users');
const routeMovies = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const { PAGE_NOT_FOUND } = require('../utils/constants');
const auth = require('../middlewares/auth');

router.use('/', routeSignin);
router.use('/', routeSignup);
router.use(auth);
router.use('/users', routeUsers);
router.use('/movies', routeMovies);
router.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));
module.exports = router;
