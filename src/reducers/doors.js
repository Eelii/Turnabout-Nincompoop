const doorsReducer = (state={direction:"static", open:false, visible:true}, action)=>{
    switch(action.type){
        case "DOORS_CLOSE":
            return {direction:"close", open:false, visible:true}
        case "DOORS_OPEN":
            return {...state, open:true, direction:"open"}
        case "DOORS_DISAPPEAR":
            return {...state, visible:false}
        case "DOORS_APPEAR":
            return {...state, visible:true}
        default:
            return state
    }
}

export default doorsReducer