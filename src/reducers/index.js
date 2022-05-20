import { combineReducers } from "redux";
import doorsReducer from "./doors";

const allReducers = combineReducers({
    doors: doorsReducer
})

export default allReducers