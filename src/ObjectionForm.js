import './App.css';
import { useState } from "react"
import objectionBubble from "./assets/anims/objection.gif"

const ObjectionForm = ({doTheObjection}) => {

    const [objectionFormText, setObjectionFormText] = useState("");
    
    return(
        <div style={{position:"absolute", height:"100%", width:"95%", marginRight:"3%", display:"flex", alignItems:"center", justifyContent:"right"}}>
            <div className="objectionForm">
                <div style={{width:"80%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <input type="text" maxLength={25} onChange={(e)=>(setObjectionFormText(e.target.value))} style={{width:"95%", height:"95%", fontSize:"80px"}}></input>
                </div>
                <div style={{width:"20%", height: "100%"}}>
                    <div className="objectionFormButton"
                        onClick={()=>{
                            doTheObjection(prompt=objectionFormText)
                            setObjectionFormText("")
                        }}>
                        <img src={objectionBubble}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObjectionForm