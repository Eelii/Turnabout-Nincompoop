import './App.css';
import React, {useState, useEffect} from "react"
import phoenixSuperobjection from "./anims/phoenix/phoenix-superobjection.gif"
import phoenixSuperobjection2 from "./anims/phoenix/phoenix-superobjection2.gif"
import phoenixSweat from "./anims/phoenix/phoenix-sweating(a).gif"
import phoenixSweat2 from "./anims/phoenix/phoenix-sweating(b).gif"
import phoenixNormal from "./anims/phoenix/phoenix-normal(a).gif"
import phoenixNormal2 from "./anims/phoenix/phoenix-normal(b).gif"
import phoenixThinking from "./anims/phoenix/phoenix-thinking(a).gif"
import phoenixThinking2 from "./anims/phoenix/phoenix-thinking(b).gif"
import phoenixNod from "./anims/phoenix/phoenix-nodding.gif"
import phoenixOhShit from "./anims/phoenix/phoenix-ohshit-only-once.gif"
import phoenixHeadshake from "./anims/phoenix/phoenix-headshake.gif"
import phoenixDeskslam from "./anims/phoenix/phoenix-slam-only-once.gif"
import phoenixPointing from "./anims/phoenix/phoenix-pointing(a).gif"
import phoenixPointing2 from "./anims/phoenix/phoenix-pointing(b).gif"
import phoenixSheepish from "./anims/phoenix/phoenix-sheepish(a).gif"
import phoenixSheepish2 from "./anims/phoenix/phoenix-sheepish(b).gif"
import phoenixHandsondesk from "./anims/phoenix/phoenix-handsondesk(a).gif"
import phoenixHandsondesk2 from "./anims/phoenix/phoenix-handsondesk(b).gif"
import phoenixDocument from "./anims/phoenix/phoenix-document(a).gif"
import phoenixDocument2 from "./anims/phoenix/phoenix-document(b).gif"
import phoenixConfident from "./anims/phoenix/phoenix-confident(a).gif"
import phoenixConfident2 from "./anims/phoenix/phoenix-confident(b).gif"
import phoenixObjection from "./anims/phoenix/phoenix-objecting-once.gif"
import { useSelector, useDispatch } from 'react-redux';



const anims = {
    "normal": phoenixNormal,
    "normalTalking": phoenixNormal2,
    "thinking": phoenixThinking,
    "thinkingTalking": phoenixThinking2,
    "nod": phoenixNod,
    "headshake": phoenixHeadshake,
    "ohshit": phoenixOhShit,
    "sweating": phoenixSweat,
    "sweatingTalking": phoenixSweat2,
    "deskslam": phoenixDeskslam,
    "pointing": phoenixPointing,
    "pointingTalking": phoenixPointing2,
    "sheepish": phoenixSheepish,
    "sheepishTalking": phoenixSheepish2,
    "handsondesk": phoenixHandsondesk,
    "handsondeskTalking": phoenixHandsondesk2,
    "reading": phoenixDocument,
    "readingTalking": phoenixDocument2,
    "confident": phoenixConfident,
    "confidentTalking":phoenixConfident2,
    "objection":phoenixObjection
}

const getAnimation = (phoenix) => {
    if(phoenix.talking == false){
        switch(phoenix.animation){
            case "normal":
                return phoenixNormal
            case "thinking":
                return phoenixThinking
            case "sweating":
                return phoenixSweat
            case "pointing":
                return phoenixPointing
            case "sheepish":
                return phoenixSheepish
            case "handsondesk":
                return phoenixHandsondesk
            case "reading":
                return phoenixDocument
            case "confident":
                return phoenixConfident
            case "deskslam":
                return phoenixDeskslam
            case "objection":
                return phoenixObjection
            case "ohshit":
                return phoenixOhShit
            }
    }
    if(phoenix.talking == true){
        switch(phoenix.animation){
            case "normal":
                return phoenixNormal2
            case "thinking":
                return phoenixThinking2
            case "sweating":
                return phoenixSweat2
            case "pointing":
                return phoenixPointing2
            case "sheepish":
                return phoenixSheepish2
            case "handsondesk":
                return phoenixHandsondesk2
            case "reading":
                return phoenixDocument2
            case "confident":
                return phoenixConfident2
            }
    }
    /*
    "normal": phoenixNormal,
    "normalTalking": phoenixNormal2,
    "thinking": phoenixThinking,
    "thinkingTalking": phoenixThinking2,
    "nod": phoenixNod,
    "headshake": phoenixHeadshake,
    "ohshit": phoenixOhshit,
    "sweating": phoenixSweat,
    "sweatingTalking": phoenixSweat2,
    "deskslam": phoenixDeskslam,
    "pointing": phoenixPointing,
    "pointingTalking": phoenixPointing2,
    "sheepish": phoenixSheepish,
    "sheepishTalking": phoenixSheepish2,
    "handsondesk": phoenixHandsondesk,
    "handsondeskTalking": phoenixHandsondesk2,
    "reading": phoenixDocument,
    "readingTalking": phoenixDocument2,
    "confident": phoenixConfident,
    "confidentTalking":phoenixConfidentTalking,
    "objection":phoenixObjection
    */
}

 
function Phoenix(){
    
    const phoenixReducer = useSelector(state=>state.phoenix)
    
    const phoenixAnimation = () =>{
        return <img src={getAnimation(phoenixReducer)} style={{position:"relative", top: 10, zIndex:3}}></img>
    }   

    return(phoenixAnimation(phoenixReducer.animation))
        
}

export default Phoenix