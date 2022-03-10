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

import LeaderboardForm from './LeaderboardForm';


function App() {
  const URL = "http://192.168.1.7:5000"
  const TESTRESPONSE = {sentence:"start", character:"phoenix", emoji_1:{emoji:"😊"}, emoji_2:{emoji:"😊"}, emoji_3:{emoji:"😊"}, for_judge: false, is_question: false, is_thought: false, shouting: false}
  const [phoenixAnim, setPhoenixAnim] = useState("normal")
  const [phoenixAnimForce, setPhoenixAnimForce] = useState(false)
  const [edgeworthAnim, setEdgeworthAnim] = useState("normal")
  const [edgeworthAnimForce, setEdgeworthAnimForce] = useState(false)
  const [judgeAnim, setJudgeAnim] = useState("normal")
  const [judgeAnimForce, setJudgeAnimForce] = useState(false)
  const [gif, setGif] = useState(0)
  const [cards, setCards] = useState([])
  const [acceptingCard, setAcceptingCard] = useState(false)
  const [messageReady, setMessageReady] = useState(true)
  const [messages, setMessages]  = useState([TESTRESPONSE])
  const [objectionPoints, setObjectionPoints] = useState(0)
  const OBJECTION_POINTS_MAX = 150
  const OBJECTION_POINTS_DECAY = 10
  const [objectionModeOn, setObjectionModeOn] = useState(false)
  const [meterMode, setMeterMode] = useState("objection")
  const [currentMessageType, setCurrentMessageType] = useState(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [phoenixScore, setPhoenixScore] = useState(1)
  const [edgeworthScore, setEdgeworthScore] = useState(1)
  const [blackout, setBlackout] = useState(false)
  const [objectionForm, setObjectionForm] = useState(false)
  const [objectionFormText, setObjectionFormText] = useState("")
  const [leftDoorClass, setLeftDoorClass] = useState("staticDoorLeft")
  const [rightDoorClass, setRightDoorClass] = useState("staticDoorRight")
  const [doorsDivClass, setDoorsDivClass] = useState("doorsDivVisible")
  const [promptForm, setPromptForm] = useState(false)
  const [promptFormText, setPromptFormText] = useState("")
  const [objectionBubbleVisible, setObjectionBubbleVisible] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const TIMEINTERVAL = 50
  const MAXTIME = 300
  const [fetchingMessage, setFetchingMessage] = useState(false)
  const [showGavel, setShowGavel] = useState(false)
  const [cardDroppedText, setCardDroppedText] = useState("")
  
  const [courtStarted, setCourtstarted] = useState(false)

  const [showLeaderboardForm, setShowLeaderBoardForm] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [printNameInput, setPrintNameInput] = useState("")

  const [leaderboardScores, setLeaderboardScores] = useState([])

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

  async function fetchIPdata(){
    let response = await fetch(`${URL}/getipdetails`)
    if(response.ok == true){
      return response.json()
    }
  }

  const handleKeyPress = event => {
    const pressedKey = event.key
    //console.log("PRESS")
    //console.log(pressedKey)
    //console.log(pressedKey == "d")
    if (pressedKey == "d"){
      runDialogue()
    }
  };

  useEffect(()=>{
    if(currentMessageIndex > 2){
      handleScore(phoenixScore, edgeworthScore, setPhoenixScore, setEdgeworthScore, messages[currentMessageIndex], objectionPoints, setObjectionPoints, objectionModeOn)
    }
  },[currentMessageIndex])

  useEffect(()=>{
    if(showGavel === true){
      setJudgeAnimForce(true)
      setJudgeAnim("warning")
      setTimeout(()=>{playGavelSound()},200)
      setTimeout(()=>{setShowGavel(false)}, 1800)
      setTimeout(()=>{setJudgeAnim("normal");setJudgeAnimForce(false)},2000)
    }
  },[showGavel])

  useEffect(()=>{
    if(cards.length < 5){
      setTimeout(()=>{addNewCardsToDeck(1)},2000)
    }
  },[cards])

  useEffect(()=>{
    console.log("SHOW LEADERBOARD")
    console.log(showLeaderboard)
  },[showLeaderboard])

  useEffect(()=>{
    // In case a verdict is interrupted with an objection.
    console.log(`OBJECTION MODE ON: ${objectionModeOn}`)
    if(messages[currentMessageIndex].type == "verdict"){
      if(messages[currentMessageIndex+1]?.type == "adjourned"){
        setMessages(messages.filter((message)=>(message.type != "adjourned")))
      }
    }
    if(objectionModeOn === false && timeElapsed >= MAXTIME){
      console.log("OBJECTION MODE == FALSE && TIME ELAPSED > MAX")
      setTimeout(()=>{setShowGavel(true)}, 3000)
      closingDialogue()
    }
  },[objectionModeOn])


  useEffect(()=>{
    const currentMessageTmp = messages[currentMessageIndex]

    if(currentMessageIndex === messages.length-1 && currentMessageTmp.character == "edgeworth" && timeElapsed < MAXTIME){
      setAcceptingCard(true)
    } 
    // Overtime 
    else if (objectionModeOn && currentMessageTmp.character == "edgeworth" && timeElapsed >= MAXTIME){
      setMessages(messages.filter((message)=>(message.type != "adjourned")))
      setAcceptingCard(true)
    } else{
      setAcceptingCard(false)
    }
    if(messages.length > 1){
      runDialogue()
    }
    setCurrentMessageType({"for_judge":currentMessageTmp.for_judge, "is_thought":currentMessageTmp.is_thought})
  },[currentMessageIndex])


  // ----- Initial useEffect -----
  useEffect(()=>{
    //window.addEventListener("keydown", handleKeyPress)
    //addNewCardsToDeck(5)
    //getIPdata()
    return()=>{console.log("clean up!")}
  },[])

  useEffect(()=>{
    if(cardDroppedText != ""){
      getMessagesNormal("phoenix", 1, prompt=cardDroppedText)
    }
  },[cardDroppedText])

  useEffect(()=>{
    console.log("Leaderboard scores:")
    console.log(leaderboardScores)
  },[leaderboardScores])

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
    verdictMsg.type = "verdict"
    setMessages((messages)=>([...messages, verdictMsg]))
    setFetchingMessage(false)
    return true
  }

  async function getAdjourned(){
    setFetchingMessage(true)
    let adjournedMsg = await fetchAdjourned()
    adjournedMsg.type = "adjourned"
    setMessages((messages)=>([...messages, adjournedMsg]))
    setFetchingMessage(false)
    return true
  }

  async function startingDialogue(){
    const judgeResponse = await fetchInSession("judge")
    setMessages((messages)=>([...messages, judgeResponse]))
    const edgeworthResponse = await fetchInSession("edgeworth")
    setMessages((messages)=>([...messages, edgeworthResponse]))
    const phoenixResponse = await fetchInSession("phoenix")
    setMessages((messages)=>([...messages, phoenixResponse]))
  }

  async function closingDialogue(){
    await getVerdict()
    console.log("Verdict!")
    await getAdjourned()
    console.log("Adjourned!")
  }

  async function runDialogue(){
    const currentMessageTmp = messages[currentMessageIndex]
    console.log(`MESSAGE TYPE ${messages[currentMessageIndex].type}`)
    if (timeElapsed < MAXTIME){
      setTimeElapsed((timeElapsed)=>(timeElapsed+TIMEINTERVAL))
    }
    else if(timeElapsed >= MAXTIME && objectionModeOn === false && currentMessageTmp.type != "verdict"){
      setTimeout(()=>{setShowGavel(true)}, 3000)
      closingDialogue()
      //await getVerdict()
      //await getAdjourned()
    }

    if (objectionModeOn === true){
      setObjectionPoints((objectionPoints)=>(objectionPoints-OBJECTION_POINTS_DECAY))
    }
    
    if(timeElapsed < MAXTIME || objectionModeOn === true){
      const randomNum = Math.floor(Math.random() * 101);
      if (messages[currentMessageIndex]["for_judge"] == true){
        getMessagesNormal("judge", 1)
      }
      else if (messages[currentMessageIndex].character === "phoenix" && messages[currentMessageIndex]["for_judge"] === false){
        getMessagesNormal("edgeworth", 1)
      }
      else if (messages[currentMessageIndex].character === "judge"){
        if(randomNum < 70){
          getMessagesNormal("phoenix", 1)
        } else{
          getMessagesNormal("edgeworth", 1)
        }
      }
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
    getMessagesNormal("phoenix", 1, prompt)
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
        <div className="blackoutOn"></div>
      )
    } else{
      return <div style={styles.blackoutOff}></div>
    }
  }

  const renderDoors = () => {
    return(
    <div className={doorsDivClass}>
       <div className={leftDoorClass}>
        <div className="doorRectangle1Outer">
          <div className="doorRectangleInner"></div>  
        </div>
        <div className="doorRectangle2Outer">
          <div className="doorRectangleInner"></div>  
        </div>  
      </div>
      <div className={rightDoorClass}>
        <div className="doorRectangle1Outer">
          <div className="doorRectangleInner"></div>  
        </div>
        <div className="doorRectangle2Outer">
          <div className="doorRectangleInner"></div>  
        </div>  
      </div>
    </div>
    )
  }

  const moveDoors = ({direction}) =>{
    if(direction === "close"){
      setDoorsDivClass("doorsDivVisible")
      setLeftDoorClass("closingDoorLeft")
      setRightDoorClass("closingDoorRight")
    }
    else if(direction === "open"){
      setLeftDoorClass("openingDoorLeft")
      setRightDoorClass("openingDoorRight")
      setTimeout(()=>{setDoorsDivClass("doorsDivHidden")}, 4000)  
    }
  }

  const renderObjectionForm = () => {
    if (objectionForm){
      return(
        <div className="objectionForm">
          <input type="text" maxLength={25} onChange={(e)=>(setObjectionFormText(e.target.value))} style={{width:"80%", display:"flex", float:"left", width:"70%", height:"20%", top:100}}></input>
          <div className="objectionFormButton"
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
        <div className="promptForm">
          <input type="text" maxLength={10} onChange={(e)=>(setPromptFormText(e.target.value))} style={{width:"80%", display:"flex", float:"left", width:"70%", height:"20%", top:100}}></input>
          <div className="promptFormButton" 
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
        <div className="objectionBubble">
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
          <div className="courtNotStartedBackground">
            <div style={{position: "absolute", top:"50%", left:"40%"}}>
              <AwesomeButton 
                size="large"
                type="primary"
                onPress={()=>{
                    moveDoors({direction:"open"})
                    setCourtstarted(true)
                    startingDialogue()                    
                    setTimeout(()=>{setShowGavel(true)},1000)  
                  }
                }
                >Button
              </AwesomeButton>
            </div>
          </div>
        </div>
      )
    }
  }

  // TODO
  async function getIPdata(){
    const IPdata = await fetchIPdata()
    console.log(IPdata)
  }

  const renderLeaderboard = () => {
    if (showLeaderboard === true){
      let toggleRowColor = false
      return(
        <div>
          <div className="leaderboardBackground"></div>
            <div className="leaderboardDiv">
              <div className="leaderboardList">
                <tr><th className="leaderboardTableHeading">Name</th><th className="leaderboardTableHeading">Score</th><th className="leaderboardTableHeading">Country</th></tr>
                {leaderboardScores.map((score) =>{
                  toggleRowColor = !toggleRowColor
                  if (toggleRowColor == true){
                    return(
                    <tr key={score.id} className="leaderboardTableRow1">
                      <td>{score.name}</td>
                      <td>{score.score}</td>
                      <td>{score.country}</td>
                    </tr>
                    )
                  } else{
                    return(
                      <tr key={score.id} className="leaderboardTableRow2">
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.country}</td>
                      </tr>
                      )
                    }
                }
                )}
              </div>
            </div>
        </div>
      )
    }
  }

  const renderCardDiscardArea = () =>{
    if(acceptingCard){
      return(
        <div className="cardDiscardAreaActive"/>
      )
    }
  }
 
  return (
    <div className="App">
       {renderCourtNotStarted()}
       {renderDoors()}
       <LeaderboardForm 
        showLeaderboardForm={showLeaderboardForm} 
        setShowLeaderBoardForm={setShowLeaderBoardForm} 
        setShowLeaderboard={setShowLeaderboard} 
        phoenixScore={phoenixScore} 
        setLeaderboardScores={setLeaderboardScores}
        URL={URL}
        />
       {renderLeaderboard()}
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
          {renderCardDiscardArea()}
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
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
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
          onChange={(value)=>{setVolume(value/100)}}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}>
        </ReactSlider>
      </div>
       
      <div style={styles.cardDeck}>
        <div className="timeLeftBarDiv">
          <TimeLeftBar max={MAXTIME} current={timeElapsed}/>
        </div>
        <div style={styles.cardRow}>
          <CardRow cards={cards} setCards={setCards} setCardDroppedText={setCardDroppedText} acceptingCard={acceptingCard} setAcceptingCard={setAcceptingCard}></CardRow>
        </div>
      </div>
      <div style={{backgroundColor: "red", left: 300,height: 100, width: 100, zIndex:10000, position:"absolute"}} onClick={()=>{setObjectionPoints((objectionPoints)=>(objectionPoints+10));setTimeElapsed((timeElapsed)=>(timeElapsed+1))}}></div>
      <div style={{backgroundColor:"yellow", height: 200, width: 200, zIndex:100, position:"absolute"}} onClick={()=>{getMessagesNormal("phoenix", 1)}}></div>
      <div style={{backgroundColor:"yellow", height: 200, width: 200, zIndex:100, right:1, position:"absolute"}} onClick={()=>{getMessagesNormal("edgeworth", 1)}}></div>
      <div style={{backgroundColor:"green", height: 100, width: 100, zIndex:10000, right:400, position:"absolute"}} onClick={()=>{startObjection()}}></div>
      <div style={{backgroundColor:"red", height: 100, width: 100, zIndex:10000, right:350, position:"absolute"}} onClick={()=>{setShowGavel(true);console.log(showLeaderboard)}}></div>
      <div style={{backgroundColor:"blue", height: 50, width: 50, zIndex:10000, right:450, position:"absolute"}} onClick={()=>{setPromptForm(true)}}></div>
      <div style={{backgroundColor:"orange", height: 100, width: 200, zIndex:1000, right:300, position:"absolute"}} onClick={()=>{runDialogue()}}></div>
    </div>
  );
}

export default App;
