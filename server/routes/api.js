const Router = require('express').Router;
const Users = require(__dirname + "/../models/users.js")
const Reviews = require(__dirname + "/../models/reviews.js")
const api = new Router();
module.exports = api
const config = require('../config.json')
//console.log("CONFIG",config)
const axios = require('axios')


api.get('/', (req,res) => {
    res.sendStatus(200)
})

api.get('/search', (req,res) => {
    if(req.query.s) {
        //res.send(`you searched: ${req.query.s}`)
        let url = `${config.ENDPOINT}${config.APIKEY}&s=${req.query.s}`
        console.log(url)
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.Search)
                res.json(resp.data.Search)
            })
            .catch(e=> {
                res.json([])
            })
    }
    else {
        res.json([])    
    }
})
