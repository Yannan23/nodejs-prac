const { Router } = require('express')
const { getAllMovies, createMovie, getMovieById, updateMovieById, deleteMovieById, getAllReviews, createReviewByMovieId } = require('../controllers/movie.controllers')

const movieRouter = Router()

movieRouter.get('/', getAllMovies)

movieRouter.post('/', createMovie)

movieRouter.get('/:id', getMovieById)

movieRouter.put('/:id', updateMovieById)

movieRouter.delete('/:id', deleteMovieById)

movieRouter.post('/:id/reviews', createReviewByMovieId)

movieRouter.get('/:id/reviews', getAllReviews)

module.exports = movieRouter