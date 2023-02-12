import * as types from "./actionTypes"
const signupRequest=()=>{
    return {
        type:types.SIGNUP_REQUEST
    }
}


const signupSuccess=(payload)=>{
    return {
        type:types.SIGNUP_SUCCESS,
        payload
    }
}

const signupFailiure=(payload)=>{
    return {
        type:types.SIGNUP_FAILIURE,
        payload
    }
}

const loginSuccess=(payload)=>{
    return{
        type:types.LOGIN_SUCCESS,
        payload
    }
}

export {signupFailiure,signupRequest,signupSuccess,loginSuccess}