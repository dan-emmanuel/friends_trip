const {db} = require("./dbCon.js")
const cors = require('cors');
const authRequest= require('./authRequests.js');
const eventRequest = require('./eventRequest.js')
const express = require('express')
const app = express()
app.use(cors());

const  bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.post("/signUp",authRequest.CREATE_USER)
app.post("/signIn",authRequest.GET_USER)
app.post("/updateTrip",eventRequest.UPDATE_TRIP)
app.post("/getAllTrips",eventRequest.GET_ALL_TRIP)
app.post("/getTag",eventRequest.GET_TAG)
app.post("/getAllEvents",eventRequest.GET_ALL_EVENTS)
app.post("/newEvent",eventRequest.CREATE_NEW_EVENT)





app.listen(5000)