import React, { useEffect } from 'react'
import Wave from 'react-wavify'
import marble from "./imgs/site/marble.jpg"
import fire from "./imgs/site/fire.gif"
import { useState } from 'react'
import "./App.css"
import { render } from '@testing-library/react'

// Height = 150 - 0
function ObjectionMeter ({objectionPoints, mode}){
    
    const objectionHeight = 150-objectionPoints
    const [fireHeight, setFireHeight] = useState(200)
    let meterFull = false
    
    if(objectionPoints > 150){
        meterFull = true
    }

    useEffect(()=>{
        console.log("FIREHEIGTH")
        console.log(fireHeight)
        setFireHeight((fireHeight)=>(fireHeight+100))
    },[objectionPoints])
   
    const renderFire = () =>{
        return(<img src={fire} style={{position:"absolute", height:200, zIndex:-1, width: 100}}></img>)
    }
    if (mode=="objection"){
        return(
        <diV>
            <div style={{width:100, height:150, borderStyle:"solid", borderColor:"gold", borderWidth: 2}}>
                <Wave fill='blue'
                    paused={false}
                    options={{
                        height: objectionHeight,
                        amplitude: 5,
                        speed: 0.15,
                        points: 3
                    }}
                />
                <div style={{width:130, left:-15, top:-20, height: 50, position:"relative", borderRadius:10, backgroundImage:`url(${marble})`, textAlign:"center"}}>
                <p class={meterFull?"gradientText":"objectionMeterTextNormal"}>OBJECTION!</p>
                </div>
            </div>
        </diV>
        )
    }
    else if (mode == "superobjection"){
        return(
            <diV style={{animation: "shake 1s", animationIterationCount: "infinite"}}>
                <div style={{width:100, height:150, borderStyle:"solid", borderColor:"gold", borderWidth: 2}}>
                        {renderFire()}
                        <Wave fill="url(#gradient)"
                        paused={false}
                        options={{
                            height: objectionHeight,
                            amplitude: 15,
                            speed: 0.5,
                            points: 2
                        }}
                        >
                            <defs>
                                <linearGradient id="gradient" gradientTransform="rotate(90)">
                                <stop offset="10%" stopColor="blue" />
                                <stop offset="90%" stopColor="red" />
                                </linearGradient>
                            </defs>
                        </Wave>
                        <div style={{width:130, left:-15, top:-20, height: 50, position:"relative", borderRadius:10, backgroundImage:`url(${marble})`, textAlign:"center"}}>
                        <p className="gradientText">{objectionHeight}</p>
                        </div>
                </div>
            </diV>
            )
    }
}

export default ObjectionMeter;