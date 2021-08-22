const express = require('express')
const app = express()
const knex = require('knex')
const cors = require ('cors')
app.use(cors())
let db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'D@n3mm@nu3l',
      database : 'friend_trips'
    }
}); 

module.exports= {
    db:db
}

   
