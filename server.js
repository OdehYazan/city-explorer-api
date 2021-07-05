'use strict';

// create a variable to use express library
const express = require('express'); // npm i express

require('dotenv').config();// npm i dotenv

// CORS: Cross Origin Resource Sharing
// to give the permission for who can send me request
const cors = require('cors');

const weatherData = require('./data/weather.json')

const server = express(); // server has all of the properties and method of express

const PORT = process.env.PORT;

server.use(cors());// make it open to any client

console.log(weatherData[0].city_name);

// localhost:3001/
server.get('/',(req,res)=>{
    res.status(200).send(weatherData)
})

// localhost:3001/test
server.get('/test',(request,response)=>{
    response.status(200).send('my server is working')
})

// localhost:3001/shoppingList
let myTargetList = ['shoes', 'bags', 'cat food'];
server.get('/shoppingList', (request, response) => {
  response.status(200).send(myTargetList);
});

//localhost:3001/weather?lat=&lon=&searchQuery=
server.get('/weather',(req,res)=>{
    console.log(req.query);
    let selectCity = weatherData.find (item =>{
        if(item.city_name == req.query.searchQuery) {
            return item
        }
        
    })
    res.status(200).send(selectCity);
})

// handle any route
// localhost:3001/ANY_ROUTE
server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
})


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})