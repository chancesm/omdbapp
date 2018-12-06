const Router = require('express').Router;
const api = new Router();
module.exports = api



api.get('/', (req,res) => {
    res.json({
        msg: "Welcome to the api"
    })
})