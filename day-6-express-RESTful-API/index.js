const express = require('express')
const app = express()
app.use(express.json())
app.use(cors)

let newMovieId = 2;
let reviewId = 3

const movies = [
    {
        id: 1,
        title: "Inception",
        description: "A skilled thief steals secrets from dreams.",
        types: ["Sci-Fi"],
        averageRating: 4.5,
        reviews: [
            { id: 1, content: "Amazing movie!", rating: 5 },
            { id: 2, content: "Great visuals.", rating: 4 },
        ],
    }
]

app.get('/v1/movies', (req, res) => {
    const { keyword, sort, page = 1, limit = 10 } = req.query
    let filteredMovies = [...movies]

    if (keyword) {
        filteredMovies = filteredMovies.filter(
            (m) =>
                m.title.toLowerCase().includes(keyword.toLowerCase()) ||
                m.description.toLowerCase().includes(keyword.toLowerCase()))

    }

    if (sort === 'rating') {
        filteredMovies.sort((a, b) => a.averageRating - b.averageRating)
    } else if (sort === '-rating') {
        filteredMovies.sort((a, b) => b.averageRating - a.averageRating)
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit)
    const endIndex = startIndex + parseInt(limit)
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex)

    res.status(200).json(paginatedMovies)
})

app.get('/v1/movies/:id', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id))
    if (!movie) {
        return res.status(404).json(
            {
                message: "Movie is not found"
            }
        )
    }
    res.status(200).json(movie)
})

app.post('/v1/movies', (req, res) => {
    const { title, description, types } = req.body
    if (!title || !description || !Array.isArray(types) || types.length === 0) {
        return res.status(400).json({
            message: "All fields cannot be empty"
        })
    }
    const newMovie = {
        id: newMovieId++,
        title,
        description,
        types: [],
        averageRating: 0,
        reviews: []
    }
    movies.unshift(newMovie)
    res.status(201).json(newMovie)
})

app.put('/v1/movies/:id', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id))
    if (!movie) {
        return res.status(404).json({ message: "Movie is not found" })
    }

    const { title, description, types } = req.body

    if (title) {
        movie.title = title
    }
    if (description) {
        movie.description = description
    }
    if (types) {
        if (types.length === 0 || !Array.isArray(types)) {
            return res.status(400).json({ message: "Types cannot be empty" })
        }
        movie.types = types
    }

    res.json(movie)
})


app.delete('/v1/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex((m) => m.id = parseInt(req.params.id))
    if (movieIndex === -1) {
        return res.status(404).json({ message: "Movie is not found" })
    }
    movies.splice(movieIndex, 1)
    res.sendStatus(204)
})

app.get('/v1/movies/:id/reviews', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id))
    if (!movie || !movie.reviews || movie.reviews.length === 0) {
        return res.status(404).json({
            message: "Movie is not found or no reviews"
        })
    }
    res.status(200).json(movie.reviews)
})

app.post('/v1/movies/:id/reviews', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id))
    if (!movie) {
        res.status(404).json({
            message: "Movie is not found"
        })
    }
    const { content, rating } = req.body
    if (!content || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Content and rating are required. Rating should be between 1 and 5(inc.)" })
    }
    const newReview = {
        id: reviewId++,
        content,
        rating
    }
    movie.reviews.push(newReview)
    movie.averageRating =
        +(movie.reviews.reduce((sum, current) => sum + current.rating, 0) / movie.reviews.length).toFixed(2)

    res.status(201).json(newReview)
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})

function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    next()
}