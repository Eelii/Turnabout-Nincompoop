const doorsOpen=()=>{
    return{type:"DOORS_OPEN"}
}
const doorsClose=()=>{
    return{type:"DOORS_CLOSE"}
}
const doorsDisappear=()=>{
    return{type:"DOORS_DISAPPEAR"}
}
const doorsAppear=()=>{
    return{type:"DOORS_APPEAR"}
}

export {doorsOpen, doorsClose, doorsAppear, doorsDisappear}