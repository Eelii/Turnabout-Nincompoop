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


const phoenixManualAnim=()=>{
    return{type:"PHOENIX_MANUAL_ANIM"}
}
const phoenixAutoAnim=()=>{
    return{type:"PHOENIX_AUTO_ANIM"}
}
const phoenixAnimDeskslam=()=>{
    return{type:"PHOENIX_ANIM_DESKSLAM"}
}
const phoenixAnimObjection=()=>{
    return{type:"PHOENIX_ANIM_OBJECTION"}
}
const phoenixAnimNormal=()=>{
    return{type:"PHOENIX_ANIM_NORMAL"}
}
const phoenixStartTalking=()=>{
    return{type:"PHOENIX_START_TALKING"}
}
const phoenixStopTalking=()=>{
    return{type:"PHOENIX_STOP_TALKING"}
}
const phoenixAnimSheepish=()=>{
    return{type:"PHOENIX_ANIM_SHEEPISH"}
}
const phoenixAnimSweating=()=>{
    return{type:"PHOENIX_ANIM_SWEATING"}
}
const phoenixAnimHandsondesk=()=>{
    return{type:"PHOENIX_ANIM_HANDSONDESK"}
}
const phoenixAnimReading=()=>{
    return{type:"PHOENIX_ANIM_READING"}
}
const phoenixAnimConfident=()=>{
    return{type:"PHOENIX_ANIM_CONFIDENT"}
}       
const phoenixAnimPointing=()=>{
    return{type:"PHOENIX_ANIM_POINTING"}
}
const phoenixAnimThinking=()=>{
    return{type:"PHOENIX_ANIM_THINKING"}
}
const phoenixAnimOhShit=()=>{
    return{type:"PHOENIX_ANIM_OHSHIT"}
}
    
export {
    doorsOpen,
    doorsClose, 
    doorsAppear, 
    doorsDisappear, 
    phoenixAnimNormal, 
    phoenixStartTalking, 
    phoenixStopTalking, 
    phoenixAnimSheepish, 
    phoenixAnimSweating, 
    phoenixAnimHandsondesk, 
    phoenixAnimReading, 
    phoenixAnimConfident, 
    phoenixAnimPointing, 
    phoenixAnimThinking, 
    phoenixManualAnim, 
    phoenixAnimDeskslam, 
    phoenixAnimObjection, 
    phoenixAutoAnim,
    phoenixAnimOhShit
}