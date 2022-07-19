import './App.css';
import React, {useState, useEffect} from "react"

import bow from "./assets/anims/edgeworth/edgeworth-bow(a).gif"
import confident1 from "./assets/anims/edgeworth/edgeworth-confident(a).gif"
import confident2 from "./assets/anims/edgeworth/edgeworth-confident(b).gif"
import damage2 from "./assets/anims/edgeworth/edgeworth-damage(extra).gif"
import damage1 from "./assets/anims/edgeworth/edgeworth-damage.gif"
import document1 from "./assets/anims/edgeworth/edgeworth-document(a).gif"
import document2 from "./assets/anims/edgeworth/edgeworth-document(b).gif"
import emo1 from "./assets/anims/edgeworth/edgeworth-emo(a).gif"
import emo2 from "./assets/anims/edgeworth/edgeworth-emo(b).gif"
import forward1 from "./assets/anims/edgeworth/edgeworth-forward(a).gif"
import forward2 from "./assets/anims/edgeworth/edgeworth-forward(b).gif"
import handondesk1 from "./assets/anims/edgeworth/edgeworth-handondesk(a).gif"
import handondesk2 from "./assets/anims/edgeworth/edgeworth-handondesk(b).gif"
import mad1 from "./assets/anims/edgeworth/edgeworth-mad(a).gif"
import mad2 from "./assets/anims/edgeworth/edgeworth-mad(b).gif"
import nervous1 from "./assets/anims/edgeworth/edgeworth-nervous(a).gif"
import nervous2 from "./assets/anims/edgeworth/edgeworth-nervous(b).gif"
import normal1 from "./assets/anims/edgeworth/edgeworth-normal(a).gif"
import normal2 from "./assets/anims/edgeworth/edgeworth-normal(b).gif"
import objection1 from "./assets/anims/edgeworth/edgeworth-objection.gif"
import objection2 from "./assets/anims/edgeworth/edgeworth-objects.gif"
import pointing1 from "./assets/anims/edgeworth/edgeworth-pointing(a).gif"
import pointing2 from "./assets/anims/edgeworth/edgeworth-pointing(b).gif"
import shout1 from "./assets/anims/edgeworth/edgeworth-shout(a).gif"
import shout2 from "./assets/anims/edgeworth/edgeworth-shout(b).gif"
import shrug from "./assets/anims/edgeworth/edgeworth-shrug.gif"
import sidelook1 from "./assets/anims/edgeworth/edgeworth-sidelook(a).gif"
import sidelook2 from "./assets/anims/edgeworth/edgeworth-sidelook(b).gif"
import smirk1 from "./assets/anims/edgeworth/edgeworth-smirk(a).gif"
import smirk2 from "./assets/anims/edgeworth/edgeworth-smirk(b).gif"
import smug from "./assets/anims/edgeworth/edgeworth-smug(a).gif"
import smug2 from "./assets/anims/edgeworth/edgeworth-smug(b).gif"
import strained1 from "./assets/anims/edgeworth/edgeworth-strained(a).gif"
import strained2 from "./assets/anims/edgeworth/edgeworth-strained(b).gif"
import thinking1 from "./assets/anims/edgeworth/edgeworth-thinking(a).gif"
import thinking2 from "./assets/anims/edgeworth/edgeworth-thinking(b).gif"
import thinsmile1 from "./assets/anims/edgeworth/edgeworth-thinsmile(a).gif"
import thinsmile2 from "./assets/anims/edgeworth/edgeworth-thinsmile(b).gif"
import zoom1 from "./assets/anims/edgeworth/edgeworth-zoom(a).gif"
import zoom2 from "./assets/anims/edgeworth/edgeworth-zoom(b).gif"


const anims = {
    "normal": normal1,
    "normalTalking":normal2,
    "pointing":pointing1,
    "pointingTalking":pointing2,
    "thinking":thinking1,
    "thinkingTalking":thinking2,
    "handondesk":handondesk1,
    "handondeskTalking":handondesk2,
    "confident":confident1,
    "confidentTalking":confident2,
    "reading": document1,
    "readingTalking":document2,
    "strained":strained1,
    "strainedTalking":strained2,

    "smirk":normal1,
    "smirkTalking":normal2
}

function Edgeworth({anim, style}){

    const edgeworthAnimation = (animation) =>{
            return <img src={anims[animation]} style={{position:"relative", top: 10}}></img>
    }
    return(edgeworthAnimation(anim))
}

export default Edgeworth