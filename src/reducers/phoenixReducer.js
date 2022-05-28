
// TODO
const phoenixReducer = (state={animation:"pointing", talking:false, score:1, forceAnimation:false, objection:false}, action)=>{

    if(true ==false){
        switch(action.type){
            case "PHOENIX_MANUAL_ANIM":
                return {...state, forceAnimation:true}
            case "PHOENIX_ANIM_NORMAL":
                return {...state, animation:"normal"}
            case "PHOENIX_ANIM_SHEEPISH":
                return {...state, animation:"sheepish"}
            case "PHOENIX_ANIM_SWEATING":
                return {...state, animation:"sweating"}
            case "PHOENIX_ANIM_HANDSONDESK":
                return {...state, animation:"handsondesk"}
            case "PHOENIX_ANIM_READING":
                return {...state, animation:"reading"}
            case "PHOENIX_ANIM_CONFIDENT":
                return {...state, animation:"confident"}
            case "PHOENIX_ANIM_POINTING":
                return {...state, animation:"pointing"}
            case "PHOENIX_ANIM_THINKING":
                return {...state, animation:"thinking"}
            case "PHOENIX_START_TALKING":
                return {...state, talking:true}
            case "PHOENIX_STOP_TALKING":
                return {...state, talking:false}
            default:
                return state
        }
    }
    else{
        switch(action.type){
            case "PHOENIX_AUTO_ANIM":
                return {...state, forceAnimation:false}
            case "PHOENIX_ANIM_DESKSLAM":
                return {...state, animation:"deskslam"}
            case "PHOENIX_ANIM_OBJECTION":
                return {...state, animation:"objection"}
            case "PHOENIX_MANUAL_ANIM":
                return {...state, forceAnimation:true}
            case "PHOENIX_ANIM_NORMAL":
                return {...state, animation:"normal"}
            case "PHOENIX_ANIM_SHEEPISH":
                return {...state, animation:"sheepish"}
            case "PHOENIX_ANIM_SWEATING":
                return {...state, animation:"sweating"}
            case "PHOENIX_ANIM_HANDSONDESK":
                return {...state, animation:"handsondesk"}
            case "PHOENIX_ANIM_READING":
                return {...state, animation:"reading"}
            case "PHOENIX_ANIM_CONFIDENT":
                return {...state, animation:"confident"}
            case "PHOENIX_ANIM_POINTING":
                return {...state, animation:"pointing"}
            case "PHOENIX_ANIM_THINKING":
                return {...state, animation:"thinking"}
            case "PHOENIX_START_TALKING":
                return {...state, talking:true}
            case "PHOENIX_STOP_TALKING":
                return {...state, talking:false}
            default:
                return state
        }
    }
}

export default phoenixReducer