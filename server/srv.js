const {db} = require("./dbCon.js")
const cors = require('cors');

const express = require('express')
const app = express()
app.use(cors());

const  bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post("/signUp",function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body
    console.log(body)
    console.log({firebaseId: body.useriId,user:body.userName})
    db('users').insert({firebase_id: body.useriId,username:body.userName}).returning('*')
    .then(result=>{
        res.end(JSON.stringify({...result[0],success:true}))
    })
    .catch(e=>{
        res.end(JSON.stringify({...e,success:false}))
    })
})

app.post("/signIn",function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body
    console.log(body)
    db('users').select(`username`).where('firebase_id', body.useruid)
    .then(result=>{
        console.log(result)
        res.end(JSON.stringify({...result[0],success:true}))
    })
    .catch(e=>{
        res.end(JSON.stringify({...e,success:false}))
    })
})
app.listen(5000)