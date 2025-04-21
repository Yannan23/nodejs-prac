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
    res.status(200).json(movies)
})

app.post('/v1/movies', (req, res, next) => {
    const { title, description, types } = req.body
    if (!title || !description || !Array.isArray(types) || types.length === 0) {
        res.status(400).json({
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
        res.status(400).json({
            msg: "Movie not found"
        })
    }
    res.status(200).json(movie)
})

app.put('/v1/movies/:id', (req, res, next) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === +id)
    if (!movie) {
        res.status(400).json({
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
            res.status(400).json({
                message: "Types should be an array"
            })
        }
        movie.types = types
    }
    res.status(201).json(movie)
})

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');

})