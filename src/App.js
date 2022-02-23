import './App.css';
import React, {useState, useEffect} from "react"
import useSound from 'use-sound';
import ReactSlider from 'react-slider';
import CanvasDraw from "react-canvas-draw";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import cornered2 from "./sounds/cornered2.mp3"
import objectionSoundPhoenix from "./sounds/objection_phoenix.mp3"
import DefenceView from './DefenceView';
import ProsecutionView from './ProsecutionView';
import JudgeView from './JudgeView';
import ObjectionMeter from './ObjectionMeter';
import Column from './Column';
import CardRow from './CardRow';
import TextBox from './TextBox';
import appStyles from "./App.css"
import table from "./imgs/site/table.jpg"
import handleResponse from './handleResponse';
import handleKeyPressEvent from './handleKeyPressEvent';
import handleScore from './handleScore';
import objectionBubble from "./anims/objection.gif"
import gavel from "./anims/gavel.gif"
import gavelSound from "./sounds/sfx-gavel.wav"
import TimeLeftBar from './TimeLeftBar';
import deskslamSound from "./sounds/sfx-deskslam.wav"
import { defineHidden } from '@react-spring/shared';


function App() {
  const URL = "http://88.115.45.196:5000"
  const TESTRESPONSE = {sentence:"start", character:"phoenix", emoji_1:{emoji:"haha"}, emoji_2:{emoji:"hihi"}, emoji_3:{emoji:"hehe"}}
  const [phoenixAnim, setPhoenixAnim] = useState("normal")
  const [phoenixAnimForce, setPhoenixAnimForce] = useState(false)
  const [edgeworthAnim, setEdgeworthAnim] = useState("normal")
  const [edgeworthAnimForce, setEdgeworthAnimForce] = useState(false)
  const [judgeAnim, setJudgeAnim] = useState("normal")
  const [judgeAnimForce, setJudgeAnimForce] = useState(false)
  const [gif, setGif] = useState(0)
  const [cards, setCards] = useState([])
  const [messageReady, setMessageReady] = useState(true)
  const [messages, setMessages]  = useState([TESTRESPONSE])
  const [objectionPoints, setObjectionPoints] = useState(0)
  const [objectionModeOn, setObjectionModeOn] = useState(false)
  const [meterMode, setMeterMode] = useState("objection")
  const [currentMessageType, setCurrentMessageType] = useState()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [phoenixScore, setPhoenixScore] = useState(1)
  const [edgeworthScore, setEdgeworthScore] = useState(1)
  const [blackout, setBlackout] = useState(false)
  const [objectionForm, setObjectionForm] = useState(false)
  const [objectionFormText, setObjectionFormText] = useState("")
  const [promptForm, setPromptForm] = useState(false)
  const [promptFormText, setPromptFormText] = useState("")
  const [objectionBubbleVisible, setObjectionBubbleVisible] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [fetchingMessage, setFetchingMessage] = useState(false)
  const [showGavel, setShowGavel] = useState(false)
  const [cardDroppedText, setCardDroppedText] = useState("")
  
  const [courtStarted, setCourtstarted] = useState(false)
  const [showLeaderboardForm, setShowLeaderBoardForm] = useState(true)

  const [test, setTest] = useState([])

  const [volume, setVolume] = useState(0)
  const [playCornered2, { stop }] = useSound(cornered2, {volume});
  const [playPhoenixObjection, {stopPhoenixObjection}] = useSound(objectionSoundPhoenix, {volume})
  const [playDeskslamSound, {stopDeskslamSound}] = useSound(deskslamSound, {volume:volume})
  const [playGavelSound, { stopGavel }] = useSound(gavelSound, {volume:volume})

  function getNewCard(text){
    const randomColorNum = Math.floor(Math.random() * 5)
    const randomMarginNum = Math.floor(Math.random() * 40) + 5;
    const randomRotateNum = Math.floor(Math.random() * (5+5) - 5);
    return {text:text, colorNum:randomColorNum, marginNum:randomMarginNum, rotateNum:randomRotateNum}
  }

  async function addNewCardsToDeck(cardsAmount){
    for(let i=0; i<cardsAmount; i++){
      const response = await fetchCardPrompt()
      const newCard = getNewCard(response.sentence)
      setCards((cards)=>([...cards, newCard]))
    }
  } 

  const styles ={
    mainView:{
      borderStyle:"solid",
      borderColor:"red",
      position:"absolute",
      zIndex: 1000,
      height: "70%",
      width: "80%",
      left: "9%",
      minWidth: 900
    },
    courtView:{
      borderStyle:"solid",
      borderColor:"black",
      position:"relative",
      zIndex: 1000,
      height: "70%",
      width: "80%",
      left: "10%"
    },
    objectionMeter:{
      position: "absolute",
      borderStyle:"solid",
      left: 1,
      bottom: 40
    },
    prosecutionView:{
      position: "absolute",
      right: 256,
      top: 133,
      zIndex: 1
    },
    defenceView:{
      position: "absolute",
      top: 133,
    },
    judgeView:{
      position:"absolute",
      left:"36%",
      zIndex: 1
    },
    cardDeck:{
      position:"absolute",
      borderStyle: "solid",
      borderColor: "brown",
      bottom:0,
      height:"25%",
      left: 10,
      right: 10,
      backgroundImage:`url(${table})`
    },
    cardRow:{
      position: "absolute", 
      bottom:1, 
      left: "18%", 
      zIndex:5
    },
    phoenixScore:{
      color: "blue",
      position: "absolute",
      top: 0,
      left: 30,
      fontSize: 30
    },
    edgeworthScore:{
      color: "maroon",
      position: "absolute",
      top: 0,
      right: 50,
      fontSize: 30
    },
    blackoutOn:{
      position:"absolute",
      width:"100%",
      height:"100%",
      backgroundColor:"black",
      zIndex: 2,
      animation:"blackout",
      animationDuration:"2s",
      animationTimingFunction: "linear"
    },
    objectionForm:{
      position:"absolute",
      left:"30%",
      top:"20%",
      width:"40%",
      height:"40%",
      zIndex:99999,
      backgroundColor:"white",
      borderStyle:"solid",
      borderColor:"saddlebrown",
      borderRadius:3,
      animation:"objectionFormFadeIn",
      animationDuration:"4s",
      animationTimingFunction: "linear",
      justifyContent:"center"
    },
    objectionFormButton:{
      width:"28%",
      height:"100%",
      backgroundColor:"red",
      float:"right",
    },
    objectionBubble:{
      position: "absolute",
      top: "20%",
      left: "36%"
    },
    promptForm:{
      position:"absolute",
      left:"30%",
      top:"20%",
      width:"40%",
      height:"40%",
      zIndex:99999,
      backgroundColor:"white",
      borderStyle:"solid",
      borderColor:"saddlebrown",
      borderRadius:3,
      animation:"objectionFormFadeIn",
      animationDuration:"4s",
      animationTimingFunction: "linear",
      justifyContent:"center"
    },
    promptFormButton:{
      width:"28%",
      height:"100%",
      backgroundColor:"red",
      float:"right",
    },
    timeLeftBar:{
      position: "absolute",
      top: -20,
      width: "100%"
    },
    courtNotStarted:{
      height: "100%",
      width: "100%",
      backgroundColor: "white",
      position: "absolute",
      zIndex: 10000,
    },
    leaderBoardFormBackground:{
      position: "absolute",
      height: "100%",
      width: "100%",
      zIndex: 10000,
      opacity: 0.9,
      backgroundColor: "red",
      justifyContent: "center"
    }
  }

  async function fetchSentenceSpeaking(character, objectionModeOn=false, prompt=false){
    let response
    if (prompt == false){
      response = await fetch(objectionModeOn&character=="phoenix"?`${URL}/getresponse/objection?character=${character}`:`${URL}/getresponse/speaking?character=${character}`, {headers:{"Access-Control-Allow-Origin":"*"}})
    } else{
      console.log(`Fetching with prompt ${prompt}, objection mode: ${objectionModeOn}`)
      response = await fetch(objectionModeOn?`${URL}/getresponse/speaking?character=${character}&prompt=${prompt}`:`${URL}/getresponse/speaking?character=${character}&prompt=${prompt}`, {headers:{"Access-Control-Allow-Origin":"*"}})
    }
    if(response.ok == true){
      return response.json()
    }
    
  };

  async function fetchInSession(character){
    let response = await fetch(`${URL}/insession/${character}`, {headers:{"Access-Control-Allow-Origin":"*"}})
    if(response.ok == true){
      return response.json()
    }
  }

  async function fetchVerdict(){
    let response = await fetch(`${URL}/verdict`)
    if(response.ok == true){
      return response.json()
    }
  }

  async function fetchAdjourned(){
    let response = await fetch(`${URL}/adjourned`)
    if(response.ok == true){
      return response.json()
    }
  }

  async function fetchCardPrompt(){
    let response = await fetch(`${URL}/getcardprompt`)
    if(response.ok == true){
      return response.json()
    }
  }

  const handleKeyPress = event => {
    const pressedKey = event.key
    console.log("PRESS")
    console.log(pressedKey)
    console.log(pressedKey == "d")
    if (pressedKey == "d"){
      console.log("AAAAA")
      runDialogue()
    }
  };

  useEffect(()=>{
    if(currentMessageIndex > 2){
      handleScore(phoenixScore, edgeworthScore, setPhoenixScore, setEdgeworthScore, messages[currentMessageIndex], objectionPoints, setObjectionPoints)
    }
  },[currentMessageIndex])

  useEffect(()=>{
    if(showGavel === true){
      setJudgeAnimForce(true)
      setJudgeAnim("warning")
      setTimeout(()=>{playGavelSound()},200)
      setTimeout(()=>{setShowGavel(false)}, 1800)
      setTimeout(()=>{setJudgeAnim("normal");judgeAnimForce(false)},2000)
    }
  },[showGavel])


  useEffect(()=>{
    const currentMessageTmp = messages[currentMessageIndex]
    setCurrentMessageType({"for_judge":currentMessageTmp.for_judge, "is_thought":currentMessageTmp.is_thought})
  },[currentMessageIndex])

  useEffect(()=>{
    window.addEventListener("keydown", handleKeyPress)
    console.log("ADsf")
    addNewCardsToDeck(5)
    return()=>{console.log("clean up!")}
  },[])

  useEffect(()=>{
    if(cardDroppedText != ""){
      getMessagesNormal("phoenix", 1, prompt=cardDroppedText)
    }
  },[cardDroppedText])

  async function getMessagesNormal (character, numOfMessages, prompt=undefined) {
    setFetchingMessage(true)
    if (prompt == undefined){
      for(let i = 0; i < numOfMessages; i++){
        let tmpMsg = await fetchSentenceSpeaking(character, objectionModeOn)
        setMessages((messages)=>([...messages, tmpMsg]))
      }
    } else{
      for(let i = 0; i < numOfMessages; i++){
        let tmpMsg = await fetchSentenceSpeaking(character, objectionModeOn, prompt=prompt)
        setMessages((messages)=>([...messages, tmpMsg]))
      }
    }
    setFetchingMessage(false)
  }

  async function getVerdict(){
    setFetchingMessage(true)
    let verdictMsg = await fetchVerdict()
    setMessages((messages)=>([...messages, verdictMsg]))
    setFetchingMessage(false)
  }

  async function getAdjourned(){
    setFetchingMessage(true)
    let adjournedMsg = await fetchAdjourned()
    setMessages((messages)=>([...messages, adjournedMsg]))
    setFetchingMessage(false)
  }

  async function getCourtStartDialogue(){
    const judgeResponse = await fetchInSession("judge")
    setMessages((messages)=>([...messages, judgeResponse]))
    const edgeworthResponse = await fetchInSession("edgeworth")
    setMessages((messages)=>([...messages, edgeworthResponse]))
    const phoenixResponse = await fetchInSession("phoenix")
    setMessages((messages)=>([...messages, phoenixResponse]))
    
    //console.log(tmpSentence)
    /*
    setTest((test)=>([...test, test.length])))
    .then(fetchInSession("edgeworth"))
    .then(setTest((test)=>([...test, test.length])))
    .then(fetchInSession("phoenix"))
    .then(setTest((test)=>([...test, test.length])))*/
  }


  function runDialogue(){
    setTimeElapsed((timeElapsed)=>(timeElapsed+1))
    const randomNum = Math.floor(Math.random() * 101);

    if (currentMessageType["is_thought"] == true){
      getMessagesNormal(messages[currentMessageIndex].character, 1)
    }
    else if (currentMessageType["for_judge"] == true){
      if (randomNum < 40){
        getMessagesNormal("judge", 1)
      }
      else if (randomNum < 80){
        getMessagesNormal("judge", 2)        
      }
      else{
        getMessagesNormal("judge", 3)
      }
    }
    else if (messages[currentMessageIndex].character === "phoenix"){
      getMessagesNormal("edgeworth", 1)
    }
    else if (messages[currentMessageIndex].character === "edgeworth"){
      getMessagesNormal("phoenix", 1)
    }
    else {
      getMessagesNormal("phoenix", 1)
    }
  }
  
  function startObjection(){
    setBlackout(!blackout)
    setPhoenixAnimForce(true)
    setPhoenixAnim("deskslam")
    setTimeout(()=>{playDeskslamSound()}, 0.5)
    setObjectionForm(!objectionForm)
    setObjectionModeOn(true)
  }

  function doTheObjection(prompt){
    const max = 4
    const min = 1
    const randomNum = Math.ceil(Math.random()*(max - min) + min);
    setFetchingMessage(true)
    getMessagesNormal("phoenix", randomNum)
    setPhoenixAnim("handsondesk")
    setObjectionForm(false)
    setTimeout(()=>{setPhoenixAnim("objection")}, 1250)
    setTimeout(()=>{setObjectionBubbleVisible(true);playPhoenixObjection()}, 1500)
    setTimeout(()=>{setBlackout(false)}, 1800)
    setTimeout(()=>{playCornered2()}, 1600)
    setTimeout(()=>{setObjectionBubbleVisible(false)}, 2200)
    //setTimeout(()=>{stop()}, 50000)
  }

  const renderBlackout = () => {
    if (blackout){
      return(
        <div style={styles.blackoutOn}></div>
      )
    } else{
      return <div style={styles.blackoutOff}></div>
    }
  }

  const renderObjectionForm = () => {
    if (objectionForm){
      return(
        <div style={styles.objectionForm}>
          <input type="text" maxLength={10} onChange={(e)=>(setObjectionFormText(e.target.value))} style={{width:"80%", display:"flex", float:"left", width:"70%", height:"20%", top:100}}></input>
          <div style={styles.objectionFormButton} 
            onClick={()=>{
              doTheObjection(prompt=objectionFormText)
              setObjectionFormText("")
            }}>
              Objection!
          </div>
        </div>
      )
    }
  }

  const renderPromptForm = () => {
    if (promptForm){
      return(
        <div style={styles.promptForm}>
          <input type="text" maxLength={10} onChange={(e)=>(setPromptFormText(e.target.value))} style={{width:"80%", display:"flex", float:"left", width:"70%", height:"20%", top:100}}></input>
          <div style={styles.promptFormButton} 
            onClick={()=>{
              getMessagesNormal("phoenix", 1, promptFormText)
              setPromptForm(false)
            }}>
              ...
          </div>
        </div>
      )
    }
  }

  const renderObjectionBubble = () => {
    if (objectionBubbleVisible){
      return(
        <div style={styles.objectionBubble}>
          <img src={objectionBubble} style={{position:"absolute", top: 10, zIndex:10}}></img>
        </div>
      )
    }
  }

  const renderGavel = () => {
    if(showGavel){
      return(<img style={{zIndex:1, position:"absolute", top:"30%", height:180, width:200, left:20, top:150}} src={gavel}/>)
    } else{
      return false
    }
  }

  const renderCourtNotStarted = () => {
    if(courtStarted === false){
      return(
        <div>
          <div style={styles.courtNotStarted}>
            <div style={{position: "absolute", top:"50%", left:"40%"}}>
              <AwesomeButton 
                size="large"
                type="primary"
                onPress={()=>{
                    setCourtstarted(true)
                    getCourtStartDialogue()                    
                    setTimeout(()=>{setShowGavel(true)},1000)  
                  }
                }
              >Button</AwesomeButton>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderLeaderboardForm = () => {
    if (showLeaderboardForm === true){
      return(
        <div>
          <div style={styles.leaderBoardFormBackground}></div>
          <div className="leaderboardForm">
            
            <div className="leaderboardFormTextDiv">
              <div className="leaderboardFormHeading"><p style={{fontSize:10}}>HELDÖLKF</p></div>
              <div style={{width:"78%", display:"flex", justifyContent:"center", fontSize:6, position:"absolute", top:"15%", left:"10%"}}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>
              <CanvasDraw
                style={{height:"100%", width:"100%", zIndex:1000}}
                hideInterface={false}
                lazyRadius={0}
                brushRadius={1}
                hideGrid={true}
              />

            </div>

            <div className="userSignDiv">
              <div className="printNameDiv">
                <p className="printNameText">Print Name</p>
                <input className="printNameInput" maxLength={15} type="text"></input>
              </div>
              <div className="signatureDiv">
                <div className="signatureArea">
                  <CanvasDraw 
                    style={{height:"100%", width:"100%"}}
                    hideInterface={false}
                    lazyRadius={0}
                    brushRadius={1}
                    hideGrid={true}
                  />
                </div>
                <div className="signatureLine"></div>
                <p className="signatureText">Signature</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
 
  return (
    <div className="App">
       {renderCourtNotStarted()}
       {renderLeaderboardForm()}
      <div className="mainView" style={styles.mainView}>
        <div style={styles.phoenixScore}><p>{phoenixScore}</p></div>
        <div style={styles.edgeworthScore}><p>{edgeworthScore}</p></div>
        <div className="courtView" style={styles.courtView}>
          {renderBlackout()}
          {renderObjectionForm()}
          {renderPromptForm()}
          {renderObjectionBubble()}
          <div style={styles.defenceView}>
            <DefenceView anim={phoenixAnim}></DefenceView>
          </div>

          <div style={styles.prosecutionView}>
            <ProsecutionView anim={edgeworthAnim}></ProsecutionView>
          </div>
          
          <div style={styles.judgeView}>
            {renderGavel()}
            <JudgeView anim={judgeAnim}></JudgeView>
          </div>

        </div>
        <div style={styles.objectionMeter}>
          <ObjectionMeter objectionPoints={objectionPoints} mode={meterMode}></ObjectionMeter>
        </div>
        <TextBox 
          messages={messages}
          currentMessageIndex={currentMessageIndex}
          setCurrentMessageIndex={setCurrentMessageIndex}
          phoenixAnim={phoenixAnim}
          setPhoenixAnim={setPhoenixAnim} 
          edgeworthAnim={edgeworthAnim}
          setEdgeworthAnim={setEdgeworthAnim} 
          judgeAnim={judgeAnim}
          setJudgeAnim={setJudgeAnim}
          phoenixAnimForce={phoenixAnimForce}
          setPhoenixAnimForce={setPhoenixAnimForce}
          edgeworthAnimForce={edgeworthAnimForce}
          objectionModeOn={objectionModeOn}
          fetchingMessage={fetchingMessage}
          >
        </TextBox>
      </div>
        <div style={{position:"absolute", top: 300, left: 20, zIndex:1000}}>
          <ReactSlider
            className="volumeSlider"
            thumbClassName="volumeSlider-thumb"
            trackClassName="volumeSlider-track"
            orientation="vertical"
            invert
            onChange={(value,index)=>{setVolume(value/100)}}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}>
          </ReactSlider>
        </div>
       
      <div style={styles.cardDeck}>
        <div style={styles.timeLeftBar}>
          <TimeLeftBar max={100} current={timeElapsed}/>
        </div>
        <div style={styles.cardRow}>
          <CardRow cards={cards} setCards={setCards} setCardDroppedText={setCardDroppedText}></CardRow>
        </div>
      </div>
      <div style={{backgroundColor: "red", left: 300,height: 100, width: 100, zIndex:10000, position:"absolute"}} onClick={()=>{setObjectionPoints((objectionPoints)=>(objectionPoints+10));setTimeElapsed((timeElapsed)=>(timeElapsed+1))}}></div>
      <div style={{backgroundColor:"yellow", height: 200, width: 200, zIndex:100, position:"absolute"}} onClick={()=>{getMessagesNormal("phoenix", 1)}}></div>
      <div style={{backgroundColor:"yellow", height: 200, width: 200, zIndex:100, right:1, position:"absolute"}} onClick={()=>{getMessagesNormal("edgeworth", 1)}}></div>
      <div style={{backgroundColor:"green", height: 100, width: 100, zIndex:10000, right:400, position:"absolute"}} onClick={()=>{startObjection()}}></div>
      <div style={{backgroundColor:"red", height: 100, width: 100, zIndex:10000, right:350, position:"absolute"}} onClick={()=>{setShowGavel(true)}}></div>
      <div style={{backgroundColor:"blue", height: 50, width: 50, zIndex:10000, right:450, position:"absolute"}} onClick={()=>{/*getCourtStartDialogue()*/setPromptForm(true)}}></div>
      <div style={{backgroundColor:"orange", height: 100, width: 200, zIndex:1000, right:300, position:"absolute"}} onClick={()=>{runDialogue()}}></div>
    </div>
  );
}

export default App;
