const { Router } = require('express');
const { getAllMovies, getMovieById, addMovie, updateMovieById, deleteMovieById, getReviewsByMovieId, addReviewByMovieId } = require('../controllers/movie.controller');

const movieRouter = Router();

movieRouter.get('/', getAllMovies)

movieRouter.get('/:id', getMovieById)

movieRouter.post('/', addMovie)

movieRouter.put('/:id', updateMovieById)

movieRouter.delete('/:id', deleteMovieById)

movieRouter.get('/:id/reviews', getReviewsByMovieId)

movieRouter.post('/:id/reviews', addReviewByMovieId)

module.exports = movieRouter;