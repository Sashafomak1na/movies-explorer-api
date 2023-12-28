const router = require('express').Router();

const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation');
const {
  getAllMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:id', validateDeleteMovie, deleteMovie);
module.exports = router;
