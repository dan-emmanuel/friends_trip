import axios from "axios";

export const CHANGE_EVENT_TAG = "CHANGE_EVENT_TAG"
export const NEW_EVENT = "NEW_EVENT"
export const SET_CURRENT_EVENT_ID = "SET_CURRENT_EVENT_ID"
export const CHANGE_TRIP_INFO = "CHANGE_TRIP_INFO"
export const SET_CURRENT_SUB_EVENT_ID = "SET_CURRENT_SUB_EVENT_ID"
export const MAKE_LI_CHECKED = "MAKE_LI_CHECKED"
export const NEW_LI = "NEW_LI"
export const NEW_SUB_EVENT = "NEW_SUB_EVENT"
export const UPDATE_NOTE_TEXT = "UPDATE_NOTE_TEXT"
export const UPDATE_NOTE_NAME = "UPDATE_NOTE_NAME"
export const CHECKMATE_ON_EVENT = "CHECKMATE_ON_EVENT"
export const UPDATE_ERROR = "UPDATE_ERROR"
export const GET_ALL_TAGS = "GET_ALL_TAGS"
export const GET_ALL_EVENTS = "GET_ALL_EVENTS"
export const SET_CURRENT_TRIP_ID = "SET_CURRENT_TRIP_ID"





export const changeEventTag = (obj) => async (dispatch) => {
    try {
        console.log(obj)
        let tagsInfo = {eventId:obj.event,destination:obj.destination.id}
        let succedUpdate = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}changeEventTag`,
            data: tagsInfo
        });
        console.log()
        dispatch( {
            type: CHANGE_EVENT_TAG,
            payload: obj
        })
    } catch (error) {
        
    }
    
}
export const newEvent = (e) => async (dispatch) => {
    // title: "new event"
    try {
        let newEvents = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}newEvent`,
            data: { tripId: e }
        });
        dispatch( {
            type: NEW_EVENT,
            payload: newEvents.data
        })
    } catch (error) {
        
    }
}
export const setCurrentEventId = (e) => {
    return {
        type: SET_CURRENT_EVENT_ID,
        payload: e
    }
}
export const setCurrentSubEventId = (e) => {
    return {
        type: SET_CURRENT_SUB_EVENT_ID,
        payload: e
    }
}
export const setCurrentTrip = (e) => async (dispatch) => {
    if (e !== undefined) {
        try {
            let events = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_SRV_URL}getAllEvents`,
                data: { tripId: e }
            });
            dispatch({ type: GET_ALL_EVENTS, payload: { events: events.data.events, currentTrip: e } })
        } catch (error) {
            dispatch({
                type: UPDATE_ERROR,
                payload: { message: error.message, source: "getAllEvent" }
            })
        }
    }else{
        dispatch({ type: SET_CURRENT_TRIP_ID, payload: {  currentTrip: undefined} })

    }
}
export const changeTripInfo = (e) => async (dispatch) => {
    try {
        let newtrip = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}updateTrip`,
            data: e
        });
        newtrip.data.action==="create"
        ?dispatch({ type: CHANGE_TRIP_INFO, payload: newtrip.data.newTrip })
        :dispatch({ type: CHANGE_TRIP_INFO, payload: {action:"update",tripData:{name:e.name,desc:e.desc,currentUser:e.currentUser}} })
    } catch (error) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { message: error.message, source: "changeTripInfo" }
        })
    }
}
export const makeLiChecked = (e) => {
    return {
        type: MAKE_LI_CHECKED,
        payload: { id: e.id, checked: e.checked }
    }
}
export const newLi = (e) => {
    return {
        type: NEW_LI,
        payload: e
    }
}
export const newSubEvent = (e) => {
    return {
        type: NEW_SUB_EVENT,
        payload: e
    }
}
export const updateNoteText = (e) => {
    return {
        type: UPDATE_NOTE_TEXT,
        payload: e
    }
}
export const updateNoteName = (e) => {
    return {
        type: UPDATE_NOTE_NAME,
        payload: e
    }
}
export const checkMateOnEvent = ({ mateid, value }) => {
    return {
        type: CHECKMATE_ON_EVENT,
        payload: { mateid, value }
    }
}
export const getAllTrips = (e) => async (dispatch) => {
    try {
        let trips = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}getAllTrips`,
            data: { id: e }
        });
        let events = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}getAllEvents`,
            data: { tripId: trips.data.trips[0].id }
        });
        dispatch({
            type: GET_ALL_EVENTS, payload: {
                events: events.data.events,
                trips: trips.data.trips
            }
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { message: error.message, source: "getAllTrips" }
        })
    }

}
export const getAllTag = (e) => async (dispatch) => {
    try {
        let tags = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}getTag`,
        });
        await dispatch({ type: GET_ALL_TAGS, payload: tags.data.tags })
    } catch (error) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { message: error.message, source: "getAllTag" }
        })
    }

}

