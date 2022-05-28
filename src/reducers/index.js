import { combineReducers } from "redux";
import doorsReducer from "./doors";
import phoenixReducer from "./phoenixReducer";

const allReducers = combineReducers({
    doors: doorsReducer,
    phoenix: phoenixReducer
})

export default allReducers