const db = require("./dbCon.js")

const express = require('express')
const app = express()
const  bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post("/newUser", function (req, res) {
    // res.sendFile(`${__dirname}/public/index.html`)
    console.log( req.body)
    
    
})
   
app.listen(5000)