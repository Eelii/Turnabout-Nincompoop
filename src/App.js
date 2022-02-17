
import './App.css';
import React, {useState, useEffect} from "react"
import useSound from 'use-sound';
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
import TimeLeftBar from './TimeLeftBar';
import deskslamSound from "./sounds/sfx-deskslam.wav"

function App() {

  const TESTRESPONSE = {sentence:"start", character:"phoenix", emoji_1:{emoji:"haha"}, emoji_2:{emoji:"hihi"}, emoji_3:{emoji:"hehe"}}
  const [phoenixAnim, setPhoenixAnim] = useState("normal")
  const [edgeworthAnim, setEdgeworthAnim] = useState("normal")
  const [phoenixAnimForce, setPhoenixAnimForce] = useState(false)
  const [edgeworthAnimForce, setEdgeworthAnimForce] = useState(false)
  const [judgeAnim, setJudgeAnim] = useState("normal")
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
  const [objectionBubbleVisible, setObjectionBubbleVisible] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [fetchingMessage, setFetchingMessage] = useState(false)

  const [test, setTest] = useState([])

  const [playCornered2, { stop }] = useSound(cornered2, {volume:0.5});
  const [playPhoenixObjection, {stopPhoenixObjection}] = useSound(objectionSoundPhoenix, {volume:0.5})
  const [playDeskslamSound, {stopDeskslamSound}] = useSound(deskslamSound, {volume:0.5})

  const getNewCard = () => {
    const randomColorNum = Math.floor(Math.random() * 5)
    const randomMarginNum = Math.floor(Math.random() * 40) + 5;
    const randomRotateNum = Math.floor(Math.random() * (5+5) - 5);
    const text = "hello"
    return {text:text, colorNum:randomColorNum, marginNum:randomMarginNum, rotateNum:randomRotateNum}
  }

  const addNewCardToDeck = (card) => {
    const newCard = getNewCard()
    setCards((cards)=>([...cards, newCard]))
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
      zIndex:99999999,
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
    timeLeftBar:{
      position: "absolute",
      top: -20,
      width: "100%"
    }
  }

  async function fetchSentenceSpeaking(character, objectionModeOn=false){
    const url = "http://192.168.1.7:5000"
    let response = await fetch(objectionModeOn?`${url}/getresponse/objection?character=${character}`:`${url}/getresponse/speaking?character=${character}`, {headers:{"Access-Control-Allow-Origin":"*"}})
    if(response.ok == true){
      return response.json()
    }
    
  };

  async function fetchInSession(character){
    const url = "http://192.168.1.7:5000"
    let response = await fetch(`${url}/insession/${character}`, {headers:{"Access-Control-Allow-Origin":"*"}})
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
      console.log(`MESSAGE: ${messages[currentMessageIndex]}`)
    }
  },[currentMessageIndex])

  useEffect(()=>{
    console.log("MESSAGES")
    console.log(messages)
    console.log("TEST")
    console.log(test)
  },[messages,test])

  useEffect(()=>{
    const currentMessageTmp = messages[currentMessageIndex]
    setCurrentMessageType({"for_judge":currentMessageTmp.for_judge, "is_thought":currentMessageTmp.is_thought})
  },[currentMessageIndex])

  useEffect(()=>{
    window.addEventListener("keydown", handleKeyPress)
    for (let i = 0; i < 5; i++){
      addNewCardToDeck()
    }
    return()=>{console.log("clean up!")}
  },[])

  async function getMessagesNormal (character, numOfMessages) {
    console.log(`Objection mode: ${objectionModeOn}`)
    setFetchingMessage(true)
    for(let i = 0; i < numOfMessages; i++){
      let tmpMsg = await fetchSentenceSpeaking(character, objectionModeOn)
      setMessages((messages)=>([...messages, tmpMsg]))
    }
    setFetchingMessage(false)
    console.log(messages)
    //setMessages(messagesTmp)
  }

  async function getMessagesObjection (character, numOfMessages) {
    const messagesTmp = []
    for(let i = 0; i < numOfMessages; i++){
      let tmpMsg = await fetchSentenceSpeaking(character, objectionModeOn)
      setMessages((messages)=>([...messages, tmpMsg]))
    }
    //setMessages(messagesTmp)
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

  function doTheObjection(){
    const max = 4
    const min = 1
    const randomNum = Math.ceil(Math.random()*(max - min) + min);
    getMessagesNormal("phoenix", randomNum)
    setPhoenixAnim("handsondesk")
    setObjectionForm(false)
    setTimeout(()=>{setPhoenixAnim("objection")}, 1250)
    setTimeout(()=>{setObjectionBubbleVisible(true);playPhoenixObjection()}, 1500)
    setTimeout(()=>{setBlackout(false)}, 1800)
    setTimeout(()=>{playCornered2()}, 1600)
    setTimeout(()=>{setObjectionBubbleVisible(false)}, 2200)
    setTimeout(()=>{stop()}, 50000)
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
          <input type="text" maxLength={10} style={{width:"80%", display:"flex", float:"left", width:"70%", height:"20%", top:100}}></input>
          <div style={styles.objectionFormButton} onClick={()=>{doTheObjection()}}>Objection!</div>
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

  const renderFetchingMessage = () => {
    if (fetchingMessage == true){
      return <div>TRUE</div>
    } else{
      return <div>FALSE</div>
    }
  }
  return (
    <div className="App">
      <div className="mainView" style={styles.mainView}>
        <div style={styles.phoenixScore}><p>{phoenixScore}</p></div>
        <div style={styles.edgeworthScore}><p>{edgeworthScore}</p></div>
        <div className="courtView" style={styles.courtView}>
          {renderBlackout()}
          {renderObjectionForm()}
          {renderObjectionBubble()}
          <div style={styles.defenceView}>
            <DefenceView anim={phoenixAnim}></DefenceView>
          </div>

          <div style={styles.prosecutionView}>
            <ProsecutionView anim={edgeworthAnim}></ProsecutionView>
          </div>
          
          <div style={styles.judgeView}>
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
      <div style={styles.cardDeck}>
        <div style={styles.timeLeftBar}>
          <TimeLeftBar max={100} current={timeElapsed}/>
        </div>
        <div style={styles.cardRow}>
          <CardRow cards={cards} setCards={setCards}></CardRow>
        </div>
      </div>
      <div style={{backgroundColor: "red", left: 300,height: 100, width: 100, zIndex:10000, position:"absolute"}} onClick={()=>{setObjectionPoints((objectionPoints)=>(objectionPoints+10));setTimeElapsed((timeElapsed)=>(timeElapsed+1))}}></div>
      <div style={{backgroundColor:"yellow", height: 200, width: 200, zIndex:100, position:"absolute"}} onClick={()=>{getMessagesNormal("phoenix", 1)}}></div>
      <div style={{backgroundColor:"yellow", height: 200, width: 200, zIndex:100, right:1, position:"absolute"}} onClick={()=>{getMessagesNormal("edgeworth", 1)}}></div>
      <div style={{backgroundColor:"green", height: 100, width: 100, zIndex:10000, right:400, position:"absolute"}} onClick={()=>{startObjection()}}></div>
      <div style={{backgroundColor:"red", height: 100, width: 100, zIndex:10000, right:350, position:"absolute"}} onClick={()=>{setPhoenixAnimForce(true);setPhoenixAnim("deskslam")}}></div>
      <div style={{backgroundColor:"blue", height: 50, width: 50, zIndex:10000, right:450, position:"absolute"}} onClick={()=>{getCourtStartDialogue()}}></div>
      <div style={{backgroundColor:"orange", height: 100, width: 200, zIndex:1000, right:300, position:"absolute"}} onClick={()=>{runDialogue()}}></div>
      <div style={{position:"absolute", top: 500, left: 100, zIndex:1000000}}>{renderFetchingMessage()}</div>
    </div>
  );
}

export default App;
