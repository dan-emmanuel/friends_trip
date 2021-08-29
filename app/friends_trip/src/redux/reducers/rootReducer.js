import authReducer from "./authReducer";
import eventsReducer from "./eventsReducer";
import frontReducer from "./frontReducer";

import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth : authReducer,
    events : eventsReducer,
    front:frontReducer
})

export default rootReducer