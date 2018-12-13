const Router = require('express').Router;
const Users = require(__dirname + "/../models/users.js")
const Reviews = require(__dirname + "/../models/reviews.js")
const api = new Router();
module.exports = api
const config = require('../config.json')
//console.log("CONFIG",config)
const axios = require('axios')

let protect = (req,res,next) => {
    if(req.session.user) {
        next()
    }
    else res.sendStatus(403)
}
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
        let url = `${config.ENDPOINT}${config.APIKEY}&plot=full&i=${req.params.id}`
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

api.post('/sendReview',protect, (req,res) => {
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

api.post('/userLogin', (req,res) => {
    Users.findAll({
        where: {
            userName: req.body.uname,
            password: req.body.upass
        },
        raw:true
    })
    .then(foundUser => {
        console.log("USER LOGGED IN", foundUser[0])
        res.json(foundUser[0])
        req.session.user = foundUser[0]
        req.session.save()
    })
    .catch(e => {
        console.error(e)
        res.sendStatus(403)
    })
})

api.delete('/userLogout', (req,res) => {
   req.session.user = null
   req.session.save()
   res.sendStatus(200)
})

api.post('/userRegister', (req,res) => {
    Users.create({
        userName: req.body.uname,
        password: req.body.upass,
        email:"asdf@asdf.net"
    },{raw:true})
    .then(newUser => {
        console.log("USER REGISTERED", newUser.dataValues)
        req.session.user=newUser.dataValues
        req.session.save()
        res.json(newUser)
    })
})
api.get('/user',(req,res) => {
    res.json(req.session.user)
})


     


