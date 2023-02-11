import {combineReducers, legacy_createStore} from "redux"
import { AppReducer } from "./AppReducer/AppReducer"
import { AuthReducer } from "./AuthReducer/AuthReducer"


const store=legacy_createStore(combineReducers({AuthReducer,AppReducer}))

export {store}