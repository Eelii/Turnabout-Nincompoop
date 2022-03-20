import React, { useCallback, useEffect, useState } from "react"
import Message from "./Message.js"
import emojisToPhoenixAnimation from "./emojisToPhoenixAnimation.js"
import emojisToEdgeworthAnimation from "./emojisToEdgeworthAnimation.js"
import emojisToJudgeAnimation from "./emojisToJudgeAnimation.js"
import ReactLoading from "react-loading"


const styles = {
    textBox:{
        width: 600,
        height: 100,
        backgroundColor: "Grey",
        opacity: 0.8,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "orange",
        borderRadius: 5,
        position: "relative",
        top: 10,
        left: "23%"
    },
    nextMsgBtn:{
        width: 60, 
        height: 50, 
        right: 0,
        top: 60,
        position: "absolute"
    },
    characterNameBoxPhoenix:{
        position:"absolute",
        backgroundColor: "blue",
        left: 0,
        width: 80,
        height: 30,
        textAlign: "center"
    },
    characterNameBoxEdgeworth:{
        position:"absolute",
        right: 0,
        backgroundColor: "maroon",
        width: 80,
        height: 30,
        textAlign: "center"
    },
    characterNameBoxJudge:{
        position:"absolute",
        left: "43%",
        top: -30,
        backgroundColor: "saddlebrown",
        width: 80,
        height: 30,
        textAlign: "center"
    },
    characterNameText:{
        color: "white",
        fontSize: 15,
        marginTop: 3,
    },
    messageText:{
        position:"absolute",
        left: 10,
        bottom:0,
        width: "90%",
        height: "70%"
    }
    
}

function TextBox({
        messages,
        setPhoenixAnim, 
        phoenixAnim, 
        setEdgeworthAnim, 
        edgeworthAnim, 
        setJudgeAnim, 
        judgeAnim, 
        currentMessageIndex, 
        setCurrentMessageIndex, 
        phoenixAnimForce, 
        setPhoenixAnimForce, 
        edgeworthAnimForce, 
        objectionModeOn, 
        fetchingMessage,
        timeElapsed,
        setTimeElapsed
    }){
    const MAXTIME = 300
    const [messageReady, setMessageReady] = useState(false)
    const nextMessageIndex = () =>{
        setCurrentMessageIndex((index)=>(index+1))
    }

    const currentMessage = messages[currentMessageIndex]
    if (currentMessage.character == "phoenix"){
        if (!phoenixAnimForce){
            setPhoenixAnim(emojisToPhoenixAnimation(currentMessage.emoji_1.emoji, messageReady, objectionModeOn, phoenixAnim))
        } 
    }
    else if(currentMessage.character == "edgeworth" && !edgeworthAnimForce){
        setEdgeworthAnim(emojisToEdgeworthAnimation(currentMessage.emoji_1.emoji, messageReady))
    }
    else if(currentMessage.character == "judge"){
        setJudgeAnim(emojisToJudgeAnimation(currentMessage.emoji_1.emoji, messageReady))
    }

    const renderMsgBtn = () =>{
        if(currentMessageIndex < messages.length-1 && messageReady==true){
            return( <div style={styles.nextMsgBtn} 
                        onClick={()=>{
                            nextMessageIndex()
                            if (timeElapsed < MAXTIME){
                                setTimeElapsed((timeElapsed)=>(timeElapsed+3))
                            }
                            setMessageReady(false)
                            if(phoenixAnimForce == true){
                                setPhoenixAnimForce(false)
                        }}}>
                        <div className="arrowsDiv">
                            <div className="arrowFirst"></div>
                        </div>
                    </div>)
        } 
        else if(currentMessageIndex < messages.length-1 && messageReady==false){
            return(<div style={styles.nextMsgBtn}></div>)
        }
        else if (currentMessageIndex == messages.length-1){
            return(<p></p>)
        }
    }

    const renderCharacterNameBox = () => {
        if(currentMessage.character == "phoenix"){
            return(<div style={styles.characterNameBoxPhoenix}><p style={styles.characterNameText}>Phoenix</p></div>)
        }
        else if (currentMessage.character == "edgeworth"){
            return(<div style={styles.characterNameBoxEdgeworth}><p style={styles.characterNameText}>Edgeworth</p></div>)
        } else{
            return(<div style={styles.characterNameBoxJudge}><p style={styles.characterNameText}>Judge</p></div>)
        }
    }
    
    const renderFetchingMessage = () => {
        if (fetchingMessage){
            return(
                <div style={{position: "absolute", top: "30%", left:"2%", zIndex: 100, left: -30}}>
                    <ReactLoading color="black" type="bars" height={20} width={20}></ReactLoading>
                </div>
            )
        } else{
            return(
                <div></div>
            )
        }
    }
    return(
        <div>
        <div style={styles.textBox}>
            {renderCharacterNameBox()}
            {renderFetchingMessage()}
            <div style={styles.messageText}>
                <Message message={messages[currentMessageIndex].sentence} setMessageReady={setMessageReady} objectionModeOn={objectionModeOn}></Message>
                <p>
                    {messages[currentMessageIndex].emoji_1.emoji}
                    {messages[currentMessageIndex].emoji_2.emoji}
                    {messages[currentMessageIndex].emoji_3.emoji}
                </p>
            </div>
            {renderMsgBtn()}
        </div>
        </div>
    )
}

export default TextBox