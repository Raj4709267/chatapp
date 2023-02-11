const initState={
    isAuth:false
}

function AuthReducer(state=initState,action){
    const {type,payload}=action
    switch(type){
        case "ADD":{
            return {...state,isAuth:!state.isAuth}
        }
        default: return state
    }

}
export {AuthReducer}