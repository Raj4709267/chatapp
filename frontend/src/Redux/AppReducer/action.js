import * as types from "./actionTypes"

const setCurrentChat=(payload)=>{
    return {
        type:types.SET_CURRENT_CHAT,
        payload

    }
}


const setCurrentMessages=(payload)=>{
    return {
        type:types.GETCHAT_SUCCESS,
        payload

    }
}

const getChatSuccess=(payload)=>{
    return {
        type:types.GETCHAT_SUCCESS,
        payload
    }
}

export {getChatSuccess,setCurrentChat,setCurrentMessages}