fetch("http://localhost:3000/v1/movies", { mode: "no-cors" });

const express = require('express')
const app = express()
app.use(express.json())

let newMovieId = 2;

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

// app.get('/v1/movies', (req, res) => {
//     const { limit, keyword, sort, page } = req.query
//     if (keyword) {
//         const movie = movies.find((m) => m.title.toLowerCase() === keyword.toLowerCase() && m.limit)
//     }
//     res.status(200).json(movies)
// })

// app.post('/v1/movies', (req, res) => {
//     const { title, description, types } = req.body

//     if (!title || !description || !Array.isArray(types) || types.length === 0) {
//         return res.status(400).json(
//             {
//                 message: 'All fields must be required'
//             }
//         )
//     }

//     const movie = {
//         id: newMovieId++,
//         title,
//         description,
//         types: [],
//         reviews: []
//     }
//     movies.unshift(movie)
//     res.status(201).json(movie)
// })

// app.get('/v1/movies/:id', (req, res) => {
//     // const movieId = Number(req.params.id)
//     // const {id} = req.params
//     const movie = movies.find((m) => m.id === parseInt(req.params.id))
//     if (!movie) {
//         res.status(404).json(
//             {
//                 message: "Movie not found"
//             }
//         )
//     }
//     res.status(200).json(movie)
// })

app.delete('v1/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id))
    // movies.splice(movieIndex)
    res.sendStatus(204)
})


app.




    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    })