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
import phoenixOhshit from "./anims/phoenix/phoenix-ohshit.gif"
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
import phoenixConfidentTalking from "./anims/phoenix/phoenix-confident(b).gif"
import phoenixObjection from "./anims/phoenix/phoenix-objecting-once.gif"


const anims = {
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
}

 
function Phoenix({anim, style}){

    const phoenixAnimation = (animationNum) =>{
            return <img src={anims[animationNum]} style={{position:"absolute", top: 10, zIndex:3}}></img>
    }

    return(phoenixAnimation(anim))
        
}

export default Phoenix