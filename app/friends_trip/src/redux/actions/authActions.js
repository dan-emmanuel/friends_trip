// import axios from "axios";
import { auth } from "../../firebase";


export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const SIGN_UP_SUCCEED = "SIGN_UP_SUCCEED"
export const SIGN_UP_ERROR = "SIGN_UP_ERROR"




export const signUpAction = ({mail,password})=>async (dispatch)=>{
    try {
        console.log(mail,password)
         let newUser = await auth.createUserWithEmailAndPassword(mail,password)
         console.log(newUser.uid)
        dispatch({type:SIGN_UP_SUCCEED})
    }catch(error){
        console.log(error)
        dispatch({
            type:SIGN_UP_ERROR,
            payload:error.message
        })
    }
}


export const signUpError = (error="error")=>{
    return {
        type: SIGN_UP_ERROR,
        payload:error
        // payload: id,
    }
}
// export const signin = ({email,password})=>async(dispatch)=>{
//     try {
//         await auth.signInWithEmailAndPassword(email,password)
//         dispatch({type:LOGIN_SUCCESS})
//     } catch (error) {
//         dispatch({type:LOGIN_ERROR})
//     }
// }


