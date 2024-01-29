const router = require('express').Router();

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../utils/validation');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:id', validateDeleteMovie, deleteMovie);
module.exports = router;
