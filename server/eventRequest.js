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
                .select(["groupId", "user_id"])
                .where("user_id", body.id)
            let groupIds = groupIdsRequest.map(e => e.groupId)
            let tripsRequest = await db('holliday')
                .select("id", "name", "desc")
                .whereIn('groupId', groupIds)
            let subEventsTypes = await db(`subeventType`).select()


            res.end(JSON.stringify({ success: true, trips: tripsRequest, subEventsTypes: subEventsTypes }))
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
            let hollidayId = await db('holliday').select('groupId').where('id', body.tripId)
            let usersidsReq = await db('group').select('user_id').where('groupId', hollidayId[0].groupId)
            let usersId = usersidsReq.map(e => e.user_id)
            let usersRequest = await db('users').select('id', 'username').whereIn('id', usersId)
            res.end(JSON.stringify({ success: true, events: eventsRequest, users: usersRequest }))

        } else {
            res.end(JSON.stringify({ success: true, events: [] }))
        }
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
        let userobj = JSON.stringify(users.map(e => {
            return {
                id: e.user_id,
                mates: false
            }
        }))
        let newevent = {
            holliday_id: body.tripId,
            name: "new event",
            mates: userobj,
            tag: 1
        }
        let insertedInfo = await db('events').returning(["id", "name", "mates", "tag"]).insert(newevent)
        let subEventsTypes = await db(`subeventType`).select()
        let hollidayId = await db('holliday').select('groupId').where('id', body.tripId)
        let usersidsReq = await db('group').select('user_id').where('groupId', hollidayId[0].groupId)
        let usersId = usersidsReq.map(e => e.user_id)
        let usersRequest = await db('users').select('id', 'username').whereIn('id', usersId)
        res.end(JSON.stringify({ success: true, newEvent: insertedInfo[0], subEventsTypes: subEventsTypes,users:usersRequest }))

    } catch (error) {
        console.log(error)

    }
}
const CHANGE_EVENT_TAG = async (req, res) => {
    let body = req.body
    try {
        await db('events').where({ 'id': body.eventId })
            .update({
                tag: body.destination,
            })
        res.end(JSON.stringify({ success: true, action: "update" }))
    } catch (error) {

    }
}
const CHANGE_EVENT_NAME = async (req, res) => {
    let body = req.body
    try {
        await db('events').where({ 'id': body.eventId })
            .update({
                name: body.name,
            })
        res.end(JSON.stringify({ success: true, action: "update" }))
    } catch (error) {

    }
}
const NEW_LI = async (req, res) => {
    let body = req.body
    try {
        let newLi = await db("list").returning("id").insert({
            text: body.text,
            subeventId: body.id
        })
        res.end(JSON.stringify({ success: true, id: newLi[0] }))

    } catch (error) {
        console.log(error)
    }
}
const NEW_SUB_EVENT = async (req, res) => {
    let body = req.body

    try {
        let newSubEvent = await db("subEvents")
            .returning('id')
            .insert({ event_id: body.eventId, name: body.name, type: parseInt(body.type) })
        res.end(JSON.stringify({ success: true, subEventId: newSubEvent[0] }))
        // !attention pas de return
    } catch (error) {
        console.log(error)
    }
}
const NOTE_TEXT_MANAGE = async (req, res) => {
    let body = req.body
    try {
        await db("subEvents").update({ name: body.name }).where({ id: body.noteId })
        let textSubEvent = await db("textSubEvents")
            .select("id")
            .where({ "subeventId": body.noteId })
        let updated = textSubEvent.length > 0
            ? await db("textSubEvents")
                .returning("id")
                .update({
                    text: body.text,
                    name: body.name
                })
                .where({ "id": textSubEvent[0].id })
            : await db("textSubEvents")
                .returning("id")
                .insert({
                    text: body.text,
                    name: body.name,
                    subeventId: parseInt(body.noteId)
                })

        res.end(JSON.stringify({ success: true, textNoteId: updated[0] }))


    } catch (error) {
        console.log(error)

    }
}
const GET_ALL_SUB_EVENTS = async (req, res) => {
    let body = req.body
    try {
        let subEvents = await db(`subEvents`).select().where("event_id", body.eventId)

        for (let index = 0; index < subEvents.length; index++) {
            const element = subEvents[index];
            switch (element.type) {
                case 1:
                    let items = await db(`list`).select().where("subeventId", element.id)
                    element.items = items

                    break;
                case 2:
                    let noteText = await db(`textSubEvents`).select().where("subeventId", element.id)
                    if (noteText.length !== 0) {
                        element.text = noteText[0].text
                        element.name = noteText[0].name
                    }
                    break;
                default:
                    break;
            }
            // if(element.type===1){
            //     let items = await db(`list`).select().where("subeventId", element.id)
            //         element.items = items
            // }
            // if(element.type===2){
            //     let noteText = await db(`textSubEvents`).select().where("subeventId", element.id)
            //     element.text = noteText.text
            //     element.name = noteText.name
            // }
        }
        res.end(JSON.stringify({ success: true, subEvents }))

    } catch (error) {
        console.log(error)
    }
}
const CHANGE_LI = async (req, res) => {
    let body = req.body
    try {
        let checkedCheckBox = await db('list')
            .update({ "done": body.checked })
            .where({ 'id': body.id })
        // ! je suis laaaaaaa

        res.end(JSON.stringify({ success: true, action: "update" }))
    } catch (error) {
        console.log(error)
    }
}
const GET_USERS = async (req, res) => {
    let body = req.body
    try {
        let matched = await db(`users`).select([`username`, `id`])
            .where("username", 'like', `%${body.lookedFor}%`)
            .whereNotIn('id', body.noNeededUsersId)
        res.end(JSON.stringify({ success: true, matched }))
    } catch (error) {

    }
}
const ADD_USER_TO_TRIP = async (req, res) => {
    let body = req.body
    try {
        let groupIdrequest = await db("holliday")
            .select("groupId")
            .where("id", body.tripId)
        groupId = groupIdrequest[0].groupId
        await db("group")
            .insert({ user_id: body.userId, groupId: groupId })
        res.end(JSON.stringify({ success: true }))

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    CHANGE_EVENT_TAG,
    NEW_LI,
    NEW_SUB_EVENT,
    NOTE_TEXT_MANAGE,
    UPDATE_TRIP,
    GET_ALL_TRIP,
    GET_ALL_EVENTS,
    CREATE_NEW_EVENT,
    GET_TAG,
    CHANGE_EVENT_NAME,
    GET_ALL_SUB_EVENTS,
    CHANGE_LI,
    GET_USERS,
    ADD_USER_TO_TRIP
}