'use strict'

const axios = require('axios')
let storedMemory = {};



function moviesFun(req, res) {

    let selectedData = [];

    let userInput = req.query.cityName
    console.log(userInput)

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${userInput}`

    if (storedMemory[userInput] !== undefined) {

        console.log('Data from our server');

        res.send(storedMemory[userInput]);

    } else {
        axios.get(url).then(moviesData => {

            selectedData = moviesData.data.results.map(item => {
                return new Movie(item);
            })
            console.log('Data to movies API')

            storedMemory[userInput] = selectedData;

            res.send(selectedData);
        })
            .catch(error => {
                res.send(error)
            })
    }

}


class Movie {
    constructor(value) {
        this.title = value.original_title;
        this.overview = value.overview;
        this.average_votes = value.vote_average;
        this.total_votes = value.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${value.poster_path}`;
        this.popularity = value.popularity;
        this.released_on = value.release_date;
    }
}

module.exports = moviesFun;
