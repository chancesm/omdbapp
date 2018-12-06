const express = require('express')
let app = express()


let apiRouter = require('./routes/api.js')



app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded())

app.use('/api',apiRouter)

app.listen(3001, (e) => {
    if(e) console.log(e)
    console.log(`Server is listening`)
})