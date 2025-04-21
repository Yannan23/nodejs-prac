const express = require('express')
const app = express()
app.use(express.json())

let nextMovieId = 2

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

app.get('/v1/movies', (req, res) => {
    const { keyword, sort, limit = 10, page = 1 } = req.query

    const filteredMovie = [...movies]
    if (keyword) {
        filteredMovie = filteredMovie.filter(
            m => m.title.toLowerCase().includes(keyword.toLowerCase()) ||
                m.description.toLowerCase().includes(keyword.toLowerCase())
        )
    }
    if (sort === 'rating') {
        filteredMovie.sort((a, b) => a.averageRating - b.averageRating)
    } else if (sort === -'rating') {
        filteredMovie.sort((a, b) => b.averageRating - a.averageRating)
    }

    const startIndex = parseInt(page - 1) * parseInt(limit)
    const endIndex = parseInt(limit) + startIndex
    const pagedmovie = filteredMovie.slice(startIndex, endIndex)

    res.status(200).json(pagedmovie)
})

app.post('/v1/movies', (req, res, next) => {
    const { title, description, types } = req.body
    if (!title || !description || !Array.isArray(types) || types.length === 0) {
        return res.status(400).json({
            msg: "Missing ...."
        })
    }

    const newMovie = {
        id: nextMovieId++,
        title,
        description,
        types
    }
    movies.unshift(newMovie)
    res.status(201).json(newMovie)
})

app.get('/v1/movies/:id', (req, res, next) => {
    const { id } = req.params
    // const movie = movies.find(movie => movie.id.toString() === id)
    const movie = movies.find(movie => movie.id === +id)  //parseInt(id)
    if (!movie) {
        return res.status(404).json({
            msg: "Movie not found"
        })
    }
    res.status(200).json(movie)
})

app.put('/v1/movies/:id', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)
    if (!movie) {
        return res.status(404).json({
            msg: "Movie not found"
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
    res.status(201).json(movie)
})

app.delete('/v1/movies/:id', (req, res, next) => {
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

app.post('/v1/movies/:id/reviews', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)  //parseInt(id)
    if (!movie) {
        return res.status(404).json({
            msg: "Movie not found"
        })
    }

    const reviews = movie.reviews
    let reviewId = movie.reviews.length + 1

    const { content, rating } = req.body
    if (!content || !rating || rating < 1 || rating > 5) {
        res.status(400).json({
            message: "Field cannot be blank"
        })
    }
    const review = {
        id: reviewId++,
        content,
        rating
    }
    reviews.push(review)
    movie.averageRating = +(movie.reviews.reduce((sum, current) => sum + current.rating, 0) / movie.reviews.length).toFixed(2)
    res.status(201).json(reviews)
})

app.get('/v1/movies/:id/reviews', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)  //parseInt(id)
    if (!movie) {
        return res.status(404).json({
            msg: "Movie not found"
        })
    }

    const reviews = movie.reviews
    res.status(200).json(reviews)
})

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');

})