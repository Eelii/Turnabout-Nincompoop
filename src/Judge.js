import './App.css';
import React, {useState, useEffect} from "react"

import headshake from "./assets/anims/judge/judge-headshake.gif"
import nodding from "./assets/anims/judge/judge-nodding.gif"
import normal from "./assets/anims/judge/judge-normal(a).gif"
import normalTalking from "./assets/anims/judge/judge-normal(b).gif"
import surprisedTalking from "./assets/anims/judge/judge-surprised(b).gif"
import surprised from "./assets/anims/judge/judge-surprised.gif"
import thinking from "./assets/anims/judge/judge-thinking.gif"
import warning from "./assets/anims/judge/judge-warning(a).gif"
import warningTalking from "./assets/anims/judge/judge-warning(b).gif"

const anims = {
    "normal": normal,
    "normalTalking":normalTalking,
    "headshake":headshake,
    "nodding":nodding,
    "surprisedTalking":surprisedTalking,
    "surprised":surprised,
    "thinking":thinking,
    "warning":warning,
    "warningTalking":warningTalking
}

function Judge({anim, style}){

    const judgeAnimation = (animation) =>{
        return <img src={anims[animation]} style={{position:"relative", bottom: 193}}></img>
    }
    return(judgeAnimation(anim))
}

export default Judge