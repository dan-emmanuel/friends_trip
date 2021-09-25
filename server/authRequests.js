const { db } = require("./dbCon.js")

let CREATE_USER = async (req, res) => {
    let body = req.body
    try {
        let result = await db('users').insert({ firebase_id: body.useriId, username: body.userName }).returning('*')
        res.end(JSON.stringify({ ...result[0], success: true }))
    } catch (error) {
        res.end(JSON.stringify({ ...e, success: false }))
    }
}
let GET_USER = async(req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let body = req.body
        let result = await db('users').select(`username`, "id").where('firebase_id', body.useruid)
        res.end(JSON.stringify({ ...result[0], success: true }))
    } catch (error) {
        res.end(JSON.stringify({ ...e, success: false }))

    }
}

module.exports = {
    CREATE_USER,
    GET_USER
}