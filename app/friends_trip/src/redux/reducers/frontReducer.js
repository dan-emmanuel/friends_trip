import {CHANGE_SUB_MENU} from '../actions/frontActions'

const initState = {
    currentSubMenu:"events"
}


export const eventsReducer = (state=initState,action)=>{
    switch (action.type) {
        case CHANGE_SUB_MENU:
            return {
                ...state,
                currentSubMenu:action.payload
            }
    
        default:
        return {...state}   
    }
}

export default eventsReducer