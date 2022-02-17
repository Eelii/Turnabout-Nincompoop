import './App.css';
import React, {useState, useEffect} from "react"

import headshake from "./anims/judge/judge-headshake.gif"
import nodding from "./anims/judge/judge-nodding.gif"
import normal from "./anims/judge/judge-normal(a).gif"
import normalTalking from "./anims/judge/judge-normal(b).gif"
import surprisedTalking from "./anims/judge/judge-surprised(b).gif"
import surprised from "./anims/judge/judge-surprised.gif"
import thinking from "./anims/judge/judge-thinking.gif"
import warning from "./anims/judge/judge-warning(a).gif"
import warningTalking from "./anims/judge/judge-warning(b).gif"

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
            return <img src={anims[animation]} style={{position:"absolute"}}></img>
    }
    return(judgeAnimation(anim))
}

export default Judge