import {
    CHANGE_EVENT_TAG,
    NEW_EVENT,
    SET_CURRENT_EVENT_ID,
    SET_CURRENT_TRIP_ID,
    CHANGE_TRIP_INFO,
    SET_CURRENT_SUB_EVENT_ID,
    MAKE_LI_CHECKED,
    NEW_LI,
    NEW_SUB_EVENT,
    UPDATE_NOTE,
    CHECKMATE_ON_EVENT,
    // GET_ALL_TRIPS,
    GET_ALL_TAGS,
    GET_ALL_EVENTS,
    CHANGE_EVENT_NAME,
    GET_USER,
    ADD_USER,
    REMOVE_ALL
} from '../actions/eventActions'

const initState = {
    // events: [
    //     {
    //         id: 0,
    //         title: "ev1",
    //         dbId: "",
    //         mates: [
    //             {
    //                 id: 13,
    //                 mate: true,
    //                 name: "dan-emmanuel"
    //             },
    //             {
    //                 id: 14,
    //                 mate: false,
    //                 name: "toto"
    //             },

    //         ],

    //     },
    //     {
    //         id: 1,
    //         title: "ev2",
    //         dbId: "",

    //     },
    //     {
    //         id: 2,
    //         title: "ev3",
    //         dbId: "",


    //     },
    //     {
    //         id: 3,
    //         title: "ev4",
    //         dbId: "",


    //     },
    //     {
    //         id: 4,
    //         title: "ev5",
    //         dbId: "",

    //     },
    //     {
    //         id: 5,
    //         title: "ev6",
    //         dbId: "",


    //     }
    // ],
    events: [],
    // subEvents: [
    //     {
    //         id: "0",
    //         type: "list",
    //         name: "Todo list",
    //         items: [
    //             { text: `buy the ticket`, done: true },
    //             { text: `rent the house`, done: false },
    //             { text: `pay the bill`, done: false },

    //         ]
    //     },
    //     {
    //         id: "1",
    //         type: "note",
    //         name: "Note for the trip",
    //         text: "a new note for the trip"
    //     },

    // ],
    subEvents: [],
    // tags: {
    //     ideas: {
    //         id: "ideas",
    //         title: "idea",
    //         tasksId: [0, 1, 3, 5]
    //     },
    //     onDoing: {
    //         id: "onDoing",
    //         title: "on preparation",
    //         tasksId: [2]
    //     },
    //     done: {
    //         id: "done",
    //         title: "booked",
    //         tasksId: [4]
    //     }
    // },
    tags: [],
    trips: [],
    currentEvent: undefined,
    currentTrip: undefined,
    currentSubEvent: undefined,
    subEventsTypes: [],
    users:[],
    cachUsers:[]

}


export const eventsReducer = (state = initState, action) => {
    let tags, subEvents, events, trips, currentEvent
    switch (action.type) {
        case GET_USER:
            return { ...state, cachUsers:action.payload }
        case CHANGE_EVENT_TAG:
            tags = [...state.tags]
            events = [...state.events]
            currentEvent = (events.find(e => e.id === parseInt(action.payload.event)))
            currentEvent.tag = action.payload.destination.id
            let formerTag = tags.find(e => e.id === parseInt(action.payload.source.id))
            let newTag = tags.find(e => e.id === parseInt(action.payload.destination.id))
            formerTag.tasksId.splice(action.payload.source.positionRemove, 1)
            newTag.tasksId.splice(action.payload.destination.positionInsert, 0, action.payload.event)
            return { ...state, tags, events }
        case CHANGE_EVENT_NAME:
            events = [...state.events]
            currentEvent = (events.find(e => e.id === parseInt(action.payload.eventId)))
            currentEvent.name = action.payload.name
            return { ...state, events }
        case CHANGE_TRIP_INFO:

            trips = [...state.trips]
            let tripInfoUpdate 
            if (action.payload.action === "update") {
                let tripToChange = trips.find(e => e.id === state.currentTrip)
                tripToChange = { ...tripToChange, ...{ ...action.payload.tripData } }
                trips = trips.map(
                    e => {
                        return e.id === state.currentTrip
                            ? tripToChange
                            : e
                    }

                )
                tripInfoUpdate = { ...state, trips: trips }
                
            } else {
                let trip = action.payload[0]

                trips.push({ name: trip.name, desc: trip.desc, id: trip.id })
           
                tripInfoUpdate = { ...state, trips: trips }
                if(trips.length===1){
                    tripInfoUpdate.currentTrip = trips[0].id
                }
            }
            return tripInfoUpdate
        case NEW_EVENT:
            tags = [
                ...state.tags
            ]
            tags[0].tasksId.push(action.payload.newEvent.id)
            events = [...state.events]
            events.push(action.payload.newEvent)
            return { ...state, events: events, tags: tags, subEventsTypes: action.payload.subEventsTypes }
        case SET_CURRENT_EVENT_ID:
            return { ...state, currentEvent: action.payload.eventId, subEvents: action.payload.subEvents }
        case SET_CURRENT_SUB_EVENT_ID:
            return { ...state, currentSubEvent: action.payload }
        case SET_CURRENT_TRIP_ID:
            return { ...state, currentTrip: action.payload.currentTrip }
        case MAKE_LI_CHECKED:
            subEvents = [...state.subEvents]
            let currentSubevent = subEvents.find(e => parseInt(e.id) === parseInt(state.currentSubEvent))
            let currentLi = currentSubevent.items.find(e => e.id === action.payload.id)
            currentLi.done = action.payload.checked
            return { ...state, subEvents: subEvents }
        case NEW_LI:
            subEvents = [
                ...state.subEvents
            ]
            let currentUl = subEvents.find(e => parseInt(e.id) === parseInt(state.currentSubEvent))
            if(currentUl.items === undefined){
                

                currentUl.items = [{ text: action.payload.text, id: action.payload.id, done: false , subeventId:state.currentSubEvent}]
            }else{
                console.log(state.subEvents)
                currentUl.items.push({ text: action.payload.text, id: action.payload.id, done: false, subeventId:state.currentSubEvent })
            }
            return { ...state, subEvents: subEvents }
        case NEW_SUB_EVENT:

            subEvents = [
                ...state.subEvents
            ]
            subEvents.push(
                {
                    id: action.payload.id,
                    type: action.payload.type,
                    name: action.payload.name
                }
            )
            return { ...state, subEvents: subEvents }
        case UPDATE_NOTE:
            subEvents = [...state.subEvents]
            let currentNoteText = subEvents.find(e => e.id === state.currentSubEvent)
            if (currentNoteText === undefined) {
                subEvents.push(action.payload)
            } else {
                subEvents.find(e => e.id === state.currentSubEvent)
                let objIndex = subEvents.findIndex(e => e.id === state.currentSubEvent)
                subEvents[objIndex].name = action.payload.name 
                subEvents[objIndex].text = action.payload.text
            }
            return { ...state, subEvents: subEvents }
        case CHECKMATE_ON_EVENT:
            events = [...state.events]
            let currentMates = events.find(e=>e.id===state.currentEvent).mates.find(e => e.id === action.payload.mateid)
            if(currentMates!==undefined){
                currentMates.mates = action.payload.value
            }else{
                events.find(e=>e.id===state.currentEvent).mates.push({id:action.payload.mateid,mates:action.payload.value})
            }
            return { ...state, events: events }
        case REMOVE_ALL:
            return {events: [],
                subEvents: [],
                tags: [],
                    trips: [],
                    currentEvent: undefined,
                    currentTrip: undefined,
                    currentSubEvent: undefined,
                    subEventsTypes: [],
                    users:[],
                    cachUsers:[]}
        // case GET_ALL_TRIPS:
        //     console.log(action.payload)
        //     trips=action.payload.trips
        //     currentTrip=action.payload.trips[0].id
        //     events = [...action.payload.events]
        //     console.log(12)

        //     return { ...state,trips,currentTrip,events}
        case GET_ALL_TAGS:
            tags = action.payload
            tags.forEach(element => {
                element.tasksId = []
            });
            return { ...state, tags }
        case GET_ALL_EVENTS:
            events = [...action.payload.events]
            tags = [...state.tags]
            tags.forEach(e => {
                e.tasksId = []
            })
            events.forEach(e => {
                let currentTag = tags.find(tag => tag.id === e.tag)
                currentTag.tasksId.push(e.id)
            })
            let toUpdate = { events, tags }
            if (action.payload.trips !== undefined) {
                toUpdate.trips = action.payload.trips
                toUpdate.currentTrip = action.payload.trips[0].id
            }
            if (action.payload.currentTrip !== undefined) { toUpdate.currentTrip = action.payload.currentTrip }
            if (action.payload.subEventsTypes) { toUpdate.subEventsTypes = action.payload.subEventsTypes }
            if(action.payload.users){
                toUpdate.users = action.payload.users
            }

            return { ...state, ...toUpdate }
        case ADD_USER:
            let users = [...state.users]
            console.log(state)
            users.push({id:action.payload.userId,username:action.payload.username})
            return { ...state,users }
        default:
            return { ...state }
    }
}

export default eventsReducer