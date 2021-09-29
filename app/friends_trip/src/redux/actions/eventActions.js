import axios from "axios";

export const CHANGE_EVENT_TAG = "CHANGE_EVENT_TAG"
export const NEW_EVENT = "NEW_EVENT"
export const SET_CURRENT_EVENT_ID = "SET_CURRENT_EVENT_ID"
export const CHANGE_TRIP_INFO = "CHANGE_TRIP_INFO"
export const SET_CURRENT_SUB_EVENT_ID = "SET_CURRENT_SUB_EVENT_ID"
export const MAKE_LI_CHECKED = "MAKE_LI_CHECKED"
export const NEW_LI = "NEW_LI"
export const NEW_SUB_EVENT = "NEW_SUB_EVENT"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const CHECKMATE_ON_EVENT = "CHECKMATE_ON_EVENT"
export const UPDATE_ERROR = "UPDATE_ERROR"
export const GET_ALL_TAGS = "GET_ALL_TAGS"
export const GET_ALL_EVENTS = "GET_ALL_EVENTS"
export const SET_CURRENT_TRIP_ID = "SET_CURRENT_TRIP_ID"
export const CHANGE_EVENT_NAME = "CHANGE_EVENT_NAME"
export const GET_USER = "GET_USER"
export const ADD_USER = "ADD_USER"
export const REMOVE_ALL = "REMOVE_ALL"








export const getusers = (e) => async (dispatch) => {
    try {
        let users = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}getUsers`,
            data: e
        });
        dispatch({
            type: GET_USER,
            payload: users.data.matched
        })
    } catch (error) {

    }
}
export const addNewUserToTheTrip = (e)=> async(dispatch)=>{
    try {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}addNewUserToTrip`,
            data: e
        });
        dispatch({
            type:ADD_USER,
            payload: e
        })
    } catch (error) {
        
    }
}
export const cachUserEmpty = (e) => {

        return ({
            type: GET_USER,
            payload: []
        })
    
}
export const changeEventTag = (obj) => async (dispatch) => {
    try {
        let tagsInfo = { eventId: obj.event, destination: obj.destination.id }
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}changeEventTag`,
            data: tagsInfo
        });
        dispatch({
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
        dispatch({
            type: NEW_EVENT,
            payload: newEvents.data
        })
    } catch (error) {

    }
}
export const setCurrentEventId = (e) => async (dispatch) => {

    try {
        let allSubEvents = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}getAllSubEvents`,
            data: { eventId: e }
        });
        dispatch({
            type: SET_CURRENT_EVENT_ID,
            payload: { eventId: e, subEvents: allSubEvents.data.subEvents }
        })
    } catch (error) {

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
            dispatch({ type: GET_ALL_EVENTS, payload: { events: events.data.events, currentTrip: e,users:events.data.users } })
        } catch (error) {
            dispatch({
                type: UPDATE_ERROR,
                payload: { message: error.message, source: "getAllEvent" }
            })
        }
    } else {
        dispatch({ type: SET_CURRENT_TRIP_ID, payload: { currentTrip: undefined } })

    }
}
export const changeTripInfo = (e) => async (dispatch) => {
    try {
        let newtrip = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}updateTrip`,
            data: e
        });
        newtrip.data.action === "create"
            ? dispatch({ type: CHANGE_TRIP_INFO, payload: newtrip.data.newTrip })
            : dispatch({ type: CHANGE_TRIP_INFO, payload: { action: "update", tripData: { name: e.name, desc: e.desc, currentUser: e.currentUser } } })
    } catch (error) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { message: error.message, source: "changeTripInfo" }
        })
    }
}
export const makeLiChecked = (e) => async (dispatch) => {
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SRV_URL}changeLi`,
        data: e
    });
    dispatch({
        type: MAKE_LI_CHECKED,
        payload: { id: e.id, checked: e.checked }
    })
}
export const newLi = (e) => async (dispatch) => {
    try {
        let li = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}setNewLi`,
            data: e
        });
        e.id = li.data.id
        console.log({
            type: NEW_LI,
            payload: e
        })
        dispatch({
            type: NEW_LI,
            payload: e
        })
    } catch (error) {

    }

}
export const newSubEvent = (e) => async (dispatch) => {
    let newSubEvent = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SRV_URL}newSubEvent`,
        data: e
    });
    e.id = newSubEvent.data.subEventId
    dispatch({
        type: NEW_SUB_EVENT,
        payload: e
    })
}
export const changeNote = (e) => async (dispatch) => {
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SRV_URL}updateNote`,
        data: e
    });
    dispatch({
        type: UPDATE_NOTE,
        payload: e
    })
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
                trips: trips.data.trips,
                subEventsTypes: trips.data.subEventsTypes,
                users: events.data.users
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
export const changeEventName = (e) => async (dispatch) => {
    try {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}changeEventName`,
            data: e
        });
        await dispatch({ type: CHANGE_EVENT_NAME, payload: e })
    } catch (error) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { message: error.message, source: "getAllTag" }
        })
    }

}
export const removeAll = (e)=>{
    return {
        type: REMOVE_ALL,
    }
}

// ! new li 
// ! change text note