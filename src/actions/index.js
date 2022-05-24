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

const phoenixNormal=()=>{
    return{type:"PHOENIX_ANIM_NORMAL"}
}
const phoenixNormalTalking=()=>{
    return{type:"PHOENIX_ANIM_NORMAL_TALKING"}
}

export {doorsOpen, doorsClose, doorsAppear, doorsDisappear}