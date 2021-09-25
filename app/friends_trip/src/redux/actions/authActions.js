import axios from "axios";
import { auth } from "../../firebase";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const SIGN_UP_SUCCEED = "SIGN_UP_SUCCEED"
export const SIGN_UP_ERROR = "SIGN_UP_ERROR"
export const SIGN_IN_SUCCEED = "SIGN_IN_SUCCEED"
export const SIGN_IN_ERROR = "SIGN_IN_ERROR"
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS"


export const signUpAction = ({ mail, password, userName }) => async (dispatch) => {
    try {
        let newUser = await auth.createUserWithEmailAndPassword(mail, password)
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}signUp`,
            data: { useriId: newUser.user.uid, userName: userName }
        });
        dispatch({ type: SIGN_UP_SUCCEED, payload: userName })
    } catch (error) {
        dispatch({
            type: SIGN_UP_ERROR,
            payload: error.message
        })
    }
}
export const signUpError = (error = "error") => {
    return {
        type: SIGN_UP_ERROR,
        payload: error
        // payload: id,
    }
}
export const signInAction = ({ mail, password }) => async (dispatch) => {
    try {
        let user = await auth.signInWithEmailAndPassword(mail, password)
        let uuid = user.user.uid
        let userDatas = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SRV_URL}signIn`,
            data: { useruid: uuid }
        });
        if (userDatas.data.success){
            dispatch({ type: SIGN_IN_SUCCEED, payload: {name:userDatas.data.username,id:userDatas.data.id} })
        }else throw new Error('unable to connect please try again');
    } catch (error) {
        dispatch({
            type: SIGN_IN_ERROR,
            payload: error.message
        })
    }
}
export const signOutAction = () => async (dispatch) => {
    try {
        await auth.signOut()
        dispatch({ type: SIGN_OUT_SUCCESS })

    } catch (error) {
        console.log(error)
    }
}
export const checkConnected = () => async (dispatch) => {
    try {
        auth.onAuthStateChanged(async user => {
            if (user) {
                var uid = user.uid
                let userDatas = await axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_SRV_URL}signIn`,
                    data: { useruid: uid }
                });
                if (userDatas.data.success) {
                    dispatch({ type: SIGN_IN_SUCCEED, payload: {name:userDatas.data.username,id:userDatas.data.id} })
                }
            } else {


            }

        })
    } catch (error) {
        console.log(error)
    }
}

//! return userId from db 