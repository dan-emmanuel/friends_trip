export const CHANGE_EVENT_TAG = "CHANGE_EVENT_TAG"
export const NEW_EVENT = "NEW_EVENT"


export const changeEventTag = (obj) => {
    return {
        type: CHANGE_EVENT_TAG,
        payload: obj
    }
}


export const newEvent = (obj) => {
    return {
        type: NEW_EVENT,
        payload: obj
    }
}