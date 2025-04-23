const express = require('express')
const cors = require('cors')
const app = express()
const movieRouter = express.Router()

app.use(express.json())
app.use(cors())
app.use('/v1/movies', movieRouter)
let nextMovieId = 2
let reviewId = 3

const movies = [
    {
        id: 1,
        title: 'Inception',
        description: 'A skilled thief steals secrets from dreams.',
        types: ['Sci-Fi'],
        averageRating: 4.5,
        reviews: [
            { id: 1, content: 'Amazing movie!', rating: 5 },
            { id: 2, content: 'Great visuals.', rating: 4 },
        ],
    },
];

movieRouter.get('/', (req, res) => {
    const { keyword, sort, limit = 10, page = 1 } = req.query

    let filteredMovies = [...movies]
    if (keyword) {
        filteredMovies = filteredMovies.filter(
            m => m.title.toLowerCase().includes(keyword.toLowerCase()) ||
                m.description.toLowerCase().includes(keyword.toLowerCase())
        )
    }
    if (sort === 'rating') {
        filteredMovies.sort((a, b) => a.averageRating - b.averageRating)
    } else if (sort === '-rating') {
        filteredMovies.sort((a, b) => b.averageRating - a.averageRating)
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit)
    const endIndex = parseInt(limit) + startIndex
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex)

    res.status(200).json(paginatedMovies)
})

movieRouter.post('/', (req, res, next) => {
    const { title, description, types } = req.body
    if (!title || !description || !Array.isArray(types) || types.length === 0) {
        return res.status(400).json({
            message: "Missing title, description, or types"
        })
    }

    const newMovie = {
        id: nextMovieId++,
        title,
        description,
        types,
        averageRating: 0,
        reviews: []
    }
    movies.unshift(newMovie)
    res.status(201).json(newMovie)
})

movieRouter.get('/:id', (req, res, next) => {
    const { id } = req.params
    // const movie = movies.find(movie => movie.id.toString() === id)
    const movie = movies.find(movie => movie.id === +id)  //parseInt(id)
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        })
    }
    res.json(movie)
})

movieRouter.put('/:id', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        })
    }
    const { title, description, types } = req.body
    if (title) {
        movie.title = title
    }
    if (description) {
        movie.description = description
    }
    if (types) {
        if (!Array.isArray(types) || types.length === 0) {
            return res.status(400).json({
                message: "Types should be an array"
            })
        }
        movie.types = types
    }
    res.json(movie)
})

movieRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(m => m.id === +id)
    if (movieIndex === -1) {
        return res.status(404).json({
            msg: "Movie not found"
        })
    }
    movies.splice(movieIndex, 1)
    res.sendStatus(204)
})

movieRouter.post('/:id/reviews', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)  //parseInt(id)
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        })
    }

    const { content, rating } = req.body

    if (!content || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Field cannot be blank"
        })
    }
    const review = {
        id: reviewId++,
        content,
        rating
    }
    let reviews = movie.reviews

    reviews.push(review)
    movie.averageRating = +(movie.reviews.reduce((sum, current) => sum + current.rating, 0) / movie.reviews.length).toFixed(2)
    res.status(201).json(review)
})

movieRouter.get('/:id/reviews', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)  //parseInt(id)
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        })
    }

    let reviews = movie.reviews
    res.json(reviews)
})

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');

})