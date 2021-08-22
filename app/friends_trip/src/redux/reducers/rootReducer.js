import authReducer from "./authReducer";
import eventsReducer from "./eventsReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth : authReducer,
    events : eventsReducer
})

export default rootReducer