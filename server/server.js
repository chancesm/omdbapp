const express = require('express')
let app = express()
const cors = require('cors')

let apiRouter = require('./routes/api.js')
app.use(cors())


app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRouter)

app.listen(3000, (e) => {
    if(e) console.log(e)
    console.log(`Server is listening`)
})