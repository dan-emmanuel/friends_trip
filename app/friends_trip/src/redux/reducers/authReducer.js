import {LOGIN_SUCCESS,LOGIN_ERROR,SIGN_UP_SUCCEED,SIGN_UP_ERROR} from "../actions/authActions"



const initState = {
    currentUser: {},
    authError: null,
    signupErrorMessage:null,
}


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCEED:
            return { ...state, signupErrorMessage: null }
        case SIGN_UP_ERROR:
            return { ...state, signupErrorMessage: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, authError: null }
        case LOGIN_ERROR:
            return { ...state, authError: action.payload }
        default:
            return { ...state }
    }
}

export default authReducer