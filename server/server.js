const express = require('express')
let app = express()
const cors = require('cors')
const session = require('express-session')
let apiRouter = require('./routes/api.js')
app.use(cors({origin:"http://localhost:8080",credentials:true}))


app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'omdb movie search',
    resave: true,
    saveUninitialized: true,
}))
app.use('/api',apiRouter)

app.listen(3000, (e) => {
    if(e) console.log(e)
    console.log(`Server is listening`)
})

