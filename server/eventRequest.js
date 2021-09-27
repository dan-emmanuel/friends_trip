const { db } = require("./dbCon.js")

const UPDATE_TRIP = async (req, res) => {
    let body = req.body
    try {

        if (body.currentTrip === undefined) {
            let maxGroupIdreq = await db('group').max('groupId', { as: 'maxGroupId' })
            let maxGroupId = maxGroupIdreq[0].maxGroupId == null
                ? 0
                : maxGroupIdreq[0].maxGroupId + 1
            await db('group')
                .insert({ user_id: body.currentUser.id, manager: true, groupId: maxGroupId })
            let newHolliday = await db('holliday')
                .returning(['id', "name", "desc"])
                .insert({
                    groupId: maxGroupId,
                    name: body.name,
                    desc: body.desc
                })
            res.end(JSON.stringify({ success: true, action: "create", newTrip: newHolliday }))
        } else {

            await db('holliday').where({ 'id': body.currentTrip })
                .update({
                    name: body.name,
                    desc: body.desc
                })

            res.end(JSON.stringify({ success: true, action: "update" }))
        }

    } catch (error) {
        console.log(error)
    }
}
const GET_ALL_TRIP = async (req, res) => {
    let body = req.body
    try {
        if (body.id) {
            let groupIdsRequest = await db('group')
                .select("groupId")
                .where("user_id", body.id)
            let groupIds = groupIdsRequest.map(e => e.groupId)
            let tripsRequest = await db('holliday')
                .select("id", "name", "desc")
                .whereIn('groupId', groupIds)
            res.end(JSON.stringify({ success: true, trips: tripsRequest }))
        } else {
            res.end(JSON.stringify({ success: true, trips: [] }))
        }

    } catch (error) {
        console.log(error)
    }
}
const GET_ALL_EVENTS = async (req, res) => {
    let body = req.body
    try {
        if (body.tripId) {
            let eventsRequest = await db('events')
                .select()
                .where('holliday_id', body.tripId)
            res.end(JSON.stringify({ success: true, events: eventsRequest }))
        } else {
            res.end(JSON.stringify({ success: true, events: [] }))
        }
        // console.log(tripsRequest)
        // title
        // description
    } catch (error) {
        console.log(error)
    }
}
const GET_TAG = async (req, res) => {
    try {
        let tagRequest = await db('tags').select()
        res.end(JSON.stringify({ success: true, tags: tagRequest }))
    } catch (error) {
        res.end(JSON.stringify({ success: true, tags: [] }))
    }

}
const CREATE_NEW_EVENT = async (req, res) => {
    let body = req.body
    try {
        let usergroup = await db('holliday').select("groupId").where("id", body.tripId)
        let groupId = usergroup[0].groupId
        let users = await db('group').select("user_id").where("groupId", groupId)
        let userobj = JSON.stringify( users.map(e => {
            return {
                id: e.user_id,
                mates: false
            }
        }))
        let newevent = {
            holliday_id: body.tripId,
            name: "new event",
            mates:userobj,
            tag:1
        }
        let insertedInfo = await db('events').returning(["id","name","mates","tag"]).insert(newevent)
        res.end(JSON.stringify({ success: true, newEvent: insertedInfo[0] }))

    } catch (error) {
        console.log(error)

    }
}
const CHANGE_EVENT_TAG =async(req, res) => {
    let body = req.body
    try {
        console.log(body)
        
        await db('events').where({ 'id': body.eventId })
        .update({
            tag: body.destination,
        })

    res.end(JSON.stringify({ success: true, action: "update" }))
    } catch (error) {
        
    }
}
const CHANGE_TRIP_INFO = (req, res) => {

}
const MAKE_LI_CHECKED = (req, res) => {

}
const NEW_LI = (req, res) => {

}
const NEW_SUB_EVENT = (req, res) => {

}
const UPDATE_NOTE_TEXT = (req, res) => {

}
const UPDATE_NOTE_NAME = (req, res) => {

}
const CHECKMATE_ON_EVENT = (req, res) => {

}

module.exports = {
    CHANGE_EVENT_TAG,
    CHANGE_TRIP_INFO,
    MAKE_LI_CHECKED,
    NEW_LI,
    NEW_SUB_EVENT,
    UPDATE_NOTE_TEXT,
    UPDATE_NOTE_NAME,
    CHECKMATE_ON_EVENT,
    UPDATE_TRIP,
    GET_ALL_TRIP,
    GET_ALL_EVENTS,
    CREATE_NEW_EVENT,
    GET_TAG
}