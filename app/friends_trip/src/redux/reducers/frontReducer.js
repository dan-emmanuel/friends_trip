import { CHANGE_SUB_MENU,OPEN_CLOSE_EVENT_MODAL } from '../actions/frontActions'
const initState = {
    currentSubMenu: "events",
    openEventModal: false
}


export const eventsReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_SUB_MENU:
            return {
                ...state,
                currentSubMenu: action.payload
            }
        case OPEN_CLOSE_EVENT_MODAL:
            return {
                ...state,
                openEventModal: action.payload
            }
        default:    
        return { ...state }
    }
}

export default eventsReducer