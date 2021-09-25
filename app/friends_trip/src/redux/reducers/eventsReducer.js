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
    UPDATE_NOTE_TEXT,
    UPDATE_NOTE_NAME,
    CHECKMATE_ON_EVENT,
    GET_ALL_TRIPS,
    GET_ALL_TAGS,
    GET_ALL_EVENTS

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
    events:[],
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
    subEvents:[],
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
    tags:[],
    trips: [],
    currentEvent: undefined,
    currentTrip: undefined,
    currentSubEvent: undefined,

}


export const eventsReducer = (state = initState, action) => {
    let tags, subEvents,events,trips,currentTrip
    switch (action.type) {
        case CHANGE_EVENT_TAG:
            tags = { ...state.tags }
            tags[action.payload.source.id].tasksId.splice(action.payload.source.positionRemove, 1)
            tags[action.payload.destination.id].tasksId.splice(action.payload.destination.positionInsert, 0, action.payload.event)
            return { ...state, tags: tags };
        case CHANGE_TRIP_INFO:
            trips = [...state.trips]
            state.currentTrip !== undefined
                ? trips[state.currentTrip] = { name: action.payload.name, desc: action.payload.desc }
                : trips.push({ name: action.payload.name, desc: action.payload.desc })
            return { ...state, trips: trips }
        case NEW_EVENT:
            tags = {
                ...state.tags
            }
            let nextId = state.events.length
            tags.ideas.tasksId.push(nextId)
            events = [...state.events]
            events.push({ id: nextId, title: "new event", dbId: undefined })
            return { ...state, events: events, tags: tags }
        case SET_CURRENT_EVENT_ID:
            return { ...state, currentEvent: action.payload }
        case SET_CURRENT_SUB_EVENT_ID:
            return { ...state, currentSubEvent: action.payload }
        case SET_CURRENT_TRIP_ID:
            return { ...state, currentTrip: action.payload }
        case MAKE_LI_CHECKED:
            subEvents = [...state.subEvents]
            subEvents[state.currentSubEvent].items[action.payload.id].done = action.payload.checked
            return { ...state, subEvents: subEvents }
        case NEW_LI:

            subEvents = [
                ...state.subEvents
            ]
            subEvents[state.currentSubEvent].items === undefined
                ? subEvents[state.currentSubEvent].items = [{ text: action.payload, done: false }]
                : subEvents[state.currentSubEvent].items.push({ text: action.payload, done: false })

            return { ...state, subEvents: subEvents }
        case NEW_SUB_EVENT:

            subEvents = [
                ...state.subEvents
            ]
            subEvents.push(
                {
                    type: action.payload.type,
                    name: action.payload.name

                }
            )
            return { ...state, subEvents: subEvents }
        case UPDATE_NOTE_TEXT:
            subEvents = [...state.subEvents]
            subEvents[state.currentSubEvent].text = action.payload
            return { ...state, subEvents: subEvents }
        case UPDATE_NOTE_NAME:
            subEvents = [...state.subEvents]
            subEvents[state.currentSubEvent].name = action.payload
            return { ...state, subEvents: subEvents }
        case CHECKMATE_ON_EVENT:
            events = [...state.events]
            events[state.currentEvent].mates.find(e => e.id === action.payload.mateid).mate = action.payload.value
            return { ...state, events: events }
        case GET_ALL_TRIPS:
            console.log(action.payload)
            trips=action.payload.trips
            currentTrip=action.payload.trips[0].id
            events = [...action.payload.events]
            return { ...state,trips,currentTrip,events}
        case GET_ALL_TAGS:
            tags = action.payload
            tags.forEach(element => {
               element.tasksId=[]
            });
            return {...state,tags}
        case GET_ALL_EVENTS:
            events = [...action.payload.events]
            tags= [...state.tags]
            events.forEach(e=>{
                let currentTag = tags.find(tag=>tag.id===e.tag)
                currentTag.tasksId.push(e.id)
            })
            return {...state,
                events:events,
                tags:tags,
                currentTrip: action.payload.currentTrip}
        default:
            return { ...state }
    }
}

export default eventsReducer