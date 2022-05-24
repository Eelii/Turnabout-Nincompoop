
// TODO
const phoenixReducer = (state={animation:"normal", score:1, forceAnimation:false, objection:false})=>{
    switch(action.type){
        case "PHOENIX_ANIM_NORMAL":
            return {...state, animation:"normal"}
        case "PHOENIX_ANIM_NORMAL_TALKING":
            return {...state, animation:"normalTalking"}
        case "PHOENIX_ANIM_SHEEPISH":
            return {...state, animation:"sheepish"}
        case "PHOENIX_ANIM_SHEEPISH_TALKING":
            return {...state, animation:"sheepishTalking"}
        case "PHOENIX_ANIM_SWEATING":
            return {...state, animation:"sweating"}
        case "PHOENIX_ANIM_SWEATING_TALKING":
            return {...state, animation:"sweatingTalking"}
        case "PHOENIX_ANIM_HANDSONDESK":
            return {...state, animation:"handsondesk"}
        case "PHOENIX_ANIM_HANDSONDESK_TALKING":
            return {...state, animation:"handsondeskTalking"}
        case "PHOENIX_ANIM_READING":
            return {...state, animation:"reading"}
        case "PHOENIX_ANIM_READING_TALKING":
            return {...state, animation:"readingTalking"}
        case "PHOENIX_ANIM_CONFIDENT":
            return {...state, animation:"confident"}
        case "PHOENIX_ANIM_CONFIDENT_TALKING":
            return {...state, animation:"confidentTalking"}
        case "PHOENIX_ANIM_POINTING":
            return {...state, animation:"pointing"}
        case "PHOENIX_ANIM_POINTING_TALKING":
            return {...state, animation:"pointingTalking"}
        default:
            return state
    }
}