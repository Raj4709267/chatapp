import * as types from "./actionTypes"


const initState={
  currentChat:{},
  chats:[],
  messages:[],


}

function AppReducer(state=initState,action){
    const {type,payload}=action
    switch(type){
       case types.GETCHAT_SUCCESS:{
        return {
            ...state,chats:payload
        }
       }
       case types.SET_CURRENT_CHAT:{
        return {
            ...state,currentChat:payload
        }
       }
        default: return state
    }

}

export {AppReducer}