import {
    SIGN_UP_SUCCEED,
    SIGN_UP_ERROR,
    SIGN_IN_SUCCEED,
    SIGN_IN_ERROR,
    SIGN_OUT_SUCCESS
} from "../actions/authActions"



const initState = {
    currentUser: {},
    signUpSucceed: false,
    signupErrorMessage: null,
    signInErrorMessage: null,
    signInSucceed: false

}


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCEED:
            return {
                ...state,
                signupErrorMessage: null,
                signUpSucceed: true,
                currentUser: { ...state.currentUser, name: action.payload }
            }
        case SIGN_UP_ERROR:
            return { ...state, signupErrorMessage: action.payload }
        case SIGN_IN_SUCCEED:
            return {
                ...state,
                signInErrorMessage: null,
                signInSucceed: true,
                currentUser: { ...state.currentUser, name: action.payload.name,id:action.payload.id }
            }
        case SIGN_IN_ERROR:
            return { ...state, signInErrorMessage: action.payload }
        case SIGN_OUT_SUCCESS:
            return { ...state, currentUser: {},
            signUpSucceed: false,
            signupErrorMessage: null,
            signInErrorMessage: null,
            signInSucceed: false
         }
        default:
            return { ...state }
    }
}

export default authReducer