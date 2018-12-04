const express = require('express')
let app = express()

app.use(express.static('dist'))

app.listen(3001, (e) => {
    if(e) console.log(e)
    console.log(`Server is listening`)
})