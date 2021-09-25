const { db } = require("./dbCon.js")

const UPDATE_TRIP = async (req, res) => {
    let body = req.body
    console.log(body)

    try {
        if (body.currentTrip === undefined) {
            let maxGroupIdreq = await db('group').max('groupId', { as: 'maxGroupId' })
            let maxGroupId = maxGroupIdreq[0].maxGroupId == null
                ? 0
                : maxGroupIdreq[0].maxGroupId + 1
            await db('group')
                .insert({ user_id: body.currentUser.id, manager: true, groupId: maxGroupId })
            await db('holliday').insert({
                groupId: maxGroupId,
                name: body.name,
                desc: body.desc
            })
            res.end(JSON.stringify({ success: true }))
        } else {
            console.log(body.currentTrip)
            await db('holliday').where({ 'id': body.currentTrip })
                .update({
                    name: body.name,
                    desc: body.desc
                })
            res.end(JSON.stringify({ success: true }))
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
    console.log(body.tripId)

    try {
        if (body.tripId) {
            let eventsRequest = await db('events')
                .select()
                .where('holliday_id', body.tripId)
            console.log(body.tripId)
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
        await db('events')
            .insert({
                groupId: maxGroupId,
                name: body.name,
                desc: body.desc
            })
    } catch (error) {
        console.log(error)
    }
}
const CHANGE_EVENT_TAG = (req, res) => {

}
const CHANGE_TRIP_INFO = (req, res) => {

}
const NEW_EVENT = (req, res) => {

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
    NEW_EVENT,
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