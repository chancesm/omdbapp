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
api.get('/movie/:id', (req,res) => {
    if(req.params.id){
        let url = `${config.ENDPOINT}${config.APIKEY}&i=${req.params.id}`
        console.log(url)
        Promise.all([
            axios.get(url),
            Reviews.findAll({
                where: {movieId: req.params.id},
                raw:true
            })
        ])
        .then(([{data},reviews]) => {
            let movie = {...data,reviews}
            res.json(movie)
            //console.log(reviews)
        })
    }
    else {
        res.json({})
    }
}) 

api.post('/sendReview', (req,res) => {
    Reviews.create({
        movieId: req.body.movieId,
        userId: +req.body.userId,
        stars: +req.body.stars,
        review: req.body.reviewText
    })
    .then(newReview => {
        console.log("REVIEW CREATED: ", newReview)
        res.sendStatus(200)
    })

})


     


