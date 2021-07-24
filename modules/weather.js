'use strict'

const axios = require('axios')

let storedMemory = {};


function weatherFun(req, res) {

    let selectedData = [];

    const userInput = req.query.cityName;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${userInput}&key=${process.env.WEATHER_API_KEY}&days=5`;

    if (storedMemory[userInput] !== undefined) {

        console.log('Data from our server')
        res.send(storedMemory[userInput]);

    } else {

        axios.get(url).then(weatherData => {

            // console.log(weatherData.data.data);

            selectedData = weatherData.data.data.map(item => {
                return new Weather(item);
            })

            console.log('Data from weather API')

            storedMemory[userInput] = selectedData;

            res.send(selectedData);

        })
            .catch(error => {
                res.send(error);
            })


    }


}

class Weather {

    constructor(value) {

        this.valid_date = value.valid_date;
        this.description = value.weather.description;
    }

}

module.exports = weatherFun;
