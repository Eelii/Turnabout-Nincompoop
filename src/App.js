import './App.css';
import React, {useState, useEffect, useRef} from "react"
import useSound from 'use-sound';
import ReactSlider from 'react-slider';
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
import { useSelector, useDispatch } from 'react-redux';
import { doorsClose, doorsDisappear, doorsOpen, phoenixAutoAnim } from './actions';
import LeaderboardForm from './LeaderboardForm';
import { useWheel } from '@use-gesture/react';
import Doors from './Doors';
import CourtEndedOverlay from './CourtEndedOverlay';
import CourtTimeline from "./CourtTimeline"
import CourtConfetti from './CourtConfetti';
import PostCourtView from './PostCourtView';


import { NotificationsProvider, showNotification, updateNotification } from '@mantine/notifications';
import { MantineProvider, Button } from '@mantine/core';
import { BorderSolidIcon, CheckIcon, CrossCircledIcon } from '@modulz/radix-icons';
import { Check, X } from 'tabler-icons-react';
import CourtEndedOVerlay from './CourtEndedOverlay';
import {useKey, useSpeech, useAudio} from 'react-use';
import {VerdictText} from './VerdictText';

import {phoenixStartTalking, phoenixStopTalking, phoenixAnimConfident, phoenixAnimHandsondesk, phoenixAnimNormal, phoenixAnimPointing, phoenixAnimReading, phoenixAnimSheepish, phoenixAnimSweating, phoenixAnimThinking, phoenixManualAnim, phoenixAnimDeskslam, phoenixAnimObjection} from "./actions"
import { current } from '@reduxjs/toolkit';


function App() {
  const doors = useSelector(state=>state.doors)
  const URL = "http://localhost:5000"
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
  const [objectionPoints, setObjectionPoints] = useState(160)
  const OBJECTION_POINTS_MAX = 150
  const OBJECTION_POINTS_DECAY = 20
  const [objectionModeOn, setObjectionModeOn] = useState(false)
  const [meterMode, setMeterMode] = useState("objection")
  const [currentMessageType, setCurrentMessageType] = useState(null)
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
  const MAXTIME = 1000//2000
  const [fetchingMessage, setFetchingMessage] = useState(false)
  const [showGavel, setShowGavel] = useState(false)
  const [cardDroppedText, setCardDroppedText] = useState({text:"", objectionCard: false})

  const [randomQuote, setRandomQuote] = useState({quote:"", name:""})
  
  
  const [courtStarted, setCourtstarted] = useState(false)
  const [courtEnded, setCourtEnded] = useState(false)
  const [confettiVisible, setConfettiVisible] = useState(false)
  const [leaderboardFormVisible, setLeaderboardFormVisible] = useState(false)
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)



  const [printNameInput, setPrintNameInput] = useState("")

  const [leaderboardScores, setLeaderboardScores] = useState([])

  const [test, setTest] = useState([])

  const [volume, setVolume] = useState(0)
  const [playCornered2, { sound }] = useSound(cornered2, {volume});
  const [playPhoenixObjection, {stopPhoenixObjection}] = useSound(objectionSoundPhoenix, {volume})
  const [playDeskslamSound] = useSound(deskslamSound, {volume})
  const [playGavelSound, { stopGavel }] = useSound(gavelSound, {volume:volume})

  const [backendOnline, setBackendOnline] = useState(undefined)
  const dispatch = useDispatch()
  const phoenix = useSelector(state=>state.phoenix)

  const [verdict, setVerdict] = useState(undefined)
  const [verdictTextVisible, setVerdictTextVisibile] = useState(false)
  

  const [audioDeskslam, audioDeskslamState, audioDeskslamControls, ref] = useAudio({
    src: deskslamSound,
    autoPlay: false,
  });

  const styles ={
    cardDeck:{
      position:"absolute",
      borderStyle: "solid",
      borderColor: "brown",
      bottom:0,
      height:"25%",
      left: 10,
      right: 10,
      backgroundImage:`url(${table})`
    }
  }

  // ----------------------------------------


  const normal = () =>{
    dispatch(phoenixManualAnim())
    dispatch(phoenixAnimNormal())
    dispatch(()=>{
      dispatch(phoenixAutoAnim())
    },1500)
  }
  useKey('ArrowUp', slamDesk);
  useKey("ArrowDown", normal)
  

  // -------------------------------------

  function getNewCard(text, objectionResponse=false){
    if(objectionResponse==false){
      const randomColorNum = Math.floor(Math.random() * 5)
      const randomMarginNum = Math.floor(Math.random() * 40) + 5;
      const randomRotateNum = Math.floor(Math.random() * (5+5) - 5);
      return {text:text, colorNum:randomColorNum, marginNum:randomMarginNum, rotateNum:randomRotateNum}
    } else{
      const randomColorNum = Math.floor(Math.random() * 5)
      const randomMarginNum = Math.floor(Math.random() * 40) + 5;
      const randomRotateNum = Math.floor(Math.random() * (5+5) - 5);
      const textCut = text.split(" ", 5).join(" ")
      return {text:textCut, colorNum:randomColorNum, marginNum:randomMarginNum, rotateNum:randomRotateNum, response:objectionResponse}
    }
  }

  async function addNormalCardsToDeck(cardsAmount){
    for(let i=0; i<cardsAmount; i++){
      const response = await fetchCardPrompt()
      const newCard = getNewCard(response.sentence)
      newCard.type = "normal"
      setCards((cards)=>([...cards, newCard]))
    }
  } 

  async function addObjectionCardsToDeck(cardsAmount){
    for(let i=0; i<cardsAmount; i++){
      const response = await fetchObjectionCard()
      const newCard = getNewCard(response.sentence, response)
      newCard.type = "objection"
      setCards((cards)=>([...cards, newCard]))
    }
  } 

  //------------------------------ FETCH FUNCTIONS ---------------------------------------


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
    let response = await fetch(`${URL}/getcardprompt`, {headers:{"Access-Control-Allow-Origin":"*"}})
    console.log("FETCH CARD:")
    console.log(response)
    if(response.ok == true){
      return response.json()
    }
  }

  async function fetchObjectionCard(){
    let response = await fetch(`${URL}/getresponse/objection?character=phoenix`)
    if(response.ok == true){
      return response.json()
    }
  }


  async function fetchRandomTopQuote(){
    let response = await fetch(`${URL}/topquote`)
    if(response.ok == true){
      const quoteJson = await response.json()
      setRandomQuote(quoteJson)
    }
  }

  async function fetchIPdata(){
    let response = await fetch(`${URL}/getipdetails`)
    if(response.ok == true){
      return response.json()
    }
  }

  async function checkBackend(){
    showNotification({
      id: "backend-loading",
      loading:true,
      disallowClose:true,
      title: "Checking availability",
      message: "Establishing connection to language model"

    })
    await fetch(`${URL}`)
    .then(response=>response.json())
    .then(data=>{
      if(data.status == "online"){
        setTimeout(()=>{
          updateNotification({
            id: "backend-loading",
            icon: <Check/>,
            loading: false,
            autoClose: 4000,
            color: "green",
            title: "Connected",
            message: "Language model online",
            styles: (theme) => ({
            root: {
              backgroundColor: theme.white[6],
              borderColor: theme.white[6],
              '&::before': { backgroundColor: theme.white },
            },
              title: { color: theme.black },
              description: { color: theme.green },
              closeButton: {
                color: theme.white,
                '&:hover': { backgroundColor: theme.colors.blue[7] },
              },
            })
          })
          setBackendOnline(true)
        },[1000])
      } else{
        setTimeout(()=>{
          updateNotification({
            id: "backend-loading",
            icon: <X/>,
            loading: false,
            autoClose: false,
            color: "red",
            title: "Could not connect",
            message: "Language model offline",
            styles: (theme) => ({
            root: {
              backgroundColor: theme.white[6],
              borderColor: theme.white[6],
              '&::before': { backgroundColor: theme.white },
            },
              title: { color: theme.black },
              description: { color: theme.green },
              closeButton: {
                color: theme.white,
                '&:hover': { backgroundColor: theme.colors.blue[7] },
              },
            })
          })
          setBackendOnline(false)
        },[1000])
      }
    }).catch(error=>setTimeout(()=>{
      updateNotification({
        id: "backend-loading",
        icon: <X/>,
        loading: false,
        autoClose: false,
        color: "red",
        title: "Could not connect",
        message: "Language model offline",
        styles: (theme) => ({
        root: {
          backgroundColor: theme.white[6],
          borderColor: theme.white[6],
          '&::before': { backgroundColor: theme.white },
        },
          title: { color: theme.black },
          description: { color: theme.green },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.blue[7] },
          },
        })
      })
      setBackendOnline(false)
    },[1000]))
  }

  //---------------------------------------------------------------

  const handleKeyPress = event => {
    const pressedKey = event.key
    //console.log("PRESS")
    //console.log(pressedKey)
    //console.log(pressedKey == "d")
    if (pressedKey == "d"){
      runDialogue()
    }
  };

  //--------------------- UseEffects -------------------------------

  useEffect(()=>{
    //window.addEventListener("keydown", handleKeyPress)
    //addNewCardsToDeck(5)
    //getIPdata()
    checkBackend()
    return()=>{console.log("clean up!")}
  },[])

  useEffect(()=>{
    fetchRandomTopQuote()
  },[backendOnline])

  useEffect(()=>{
    if(randomQuote != null){
      console.log('QUOTE');
      console.log(randomQuote);
    }
  },[randomQuote])

  useEffect(()=>{
    console.log('MESSAGES:');
    console.log(messages);
  },[leaderboardVisible])

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
    if(cards.length < 5 && !objectionModeOn){
      addNormalCardsToDeck(1)
    }
    else if(cards.length < 5 && objectionModeOn){
      addObjectionCardsToDeck(1)
    }
  },[cards])

  useEffect(()=>{
    // In case a verdict is interrupted with an objection.
    console.log(`OBJECTION MODE ON: ${objectionModeOn}`)
    // Remove?
    /*if(messages[currentMessageIndex].type == "verdict"){
      if(messages[currentMessageIndex+1]?.type == "adjourned"){
        setMessages(messages.filter((message)=>(message.type != "adjourned")))
      }
    }*/
    if(messages[currentMessageIndex+1] != undefined){
      setMessages((messages)=>messages.slice(0,currentMessageIndex+1))
    }
    if(objectionModeOn === false && timeElapsed >= MAXTIME){
      setTimeout(()=>{setShowGavel(true)}, 3000)
    }
  },[objectionModeOn])

  useEffect(()=>{
    if(objectionPoints < 1){
      setObjectionModeOn(false)
      sound.fade(volume, 0, 3000);
    }
  },[objectionPoints])

  useEffect(()=>{

    if(currentMessageIndex > 2){
      handleScore(OBJECTION_POINTS_MAX, phoenixScore, edgeworthScore, setPhoenixScore, setEdgeworthScore, messages[currentMessageIndex], objectionPoints, setObjectionPoints, objectionModeOn)
    }

    const currentMessage = messages[currentMessageIndex]
    
    if(currentMessage.type == "verdict"){
      if(phoenixScore >= edgeworthScore){
        setVerdict("not guilty")
      } else{
        setVerdict("guilty")
      }
    }

    if(currentMessage.type == "adjourned"){
      setTimeout(()=>{
        setShowGavel(true)
        setConfettiVisible(true)
        if(verdict == "guilty"){
          dispatch(phoenixManualAnim())
          dispatch(phoenixAnimSweating())
        }
        if(verdict == "not guilty"){
          dispatch(phoenixManualAnim())
          dispatch(phoenixAnimConfident())
        }
        setTimeout(() => {
          dispatch(doorsClose()) 
          setTimeout(()=>{
            setLeaderboardFormVisible(true)
            setCourtEnded(true)
            setTimeout(()=>{
              setConfettiVisible(false)
            },10000)
          }, 5000)
        }, 3000);
      },2000)
    }

    if(objectionModeOn && currentMessageIndex === messages.length-2){
      setMessages(messages.filter((message)=>(message.type != "adjourned" && message.type != "verdict")))
    }

    if(currentMessageIndex === messages.length-1){
      if(timeElapsed < MAXTIME){
        if(currentMessage.character == "edgeworth" || currentMessage.character == "judge"){
          setAcceptingCard(true)
        } else{
          setAcceptingCard(false)
        }
      }
      else{
        if(!objectionModeOn){
          setAcceptingCard(false)
        } else{
          if((currentMessage.character == "edgeworth" || currentMessage.character == "judge") && messages.length-1 == currentMessageIndex){
            setAcceptingCard(true)
          } else{
            setAcceptingCard(false)
          }
        }
        
      }
    } 
    if(currentMessageIndex != messages.length-1){
      setAcceptingCard(false)
    }
      
    if(messages.length > 1){
      runDialogue()
    }
    setCurrentMessageType({"for_judge":currentMessage.for_judge, "is_thought":currentMessage.is_thought})
  },[currentMessageIndex])

  useEffect(()=>{
    const currentMessage = messages[currentMessageIndex]
    if(currentMessage.type == "verdict" && messageReady == true){
      setTimeout(()=>{
        setVerdictTextVisibile(true)
      }, 1000)
    }
  }, [messageReady])


  useEffect(()=>{
    if(cardDroppedText.text != "" && cardDroppedText.objectionCard == false){
      getMessagesNormal("phoenix", 1, prompt=cardDroppedText.text)
    } 
    else if(cardDroppedText.text != "" && cardDroppedText.objectionCard != false){
      setMessages((messages)=>([...messages, cardDroppedText.objectionCard]))
    }
  },[cardDroppedText])

  useEffect(()=>{
    const nextMessageIndex = currentMessageIndex+1
    const nextMessage = messages[nextMessageIndex]
    const currentMessage = messages[currentMessageIndex]
    console.log("messages")
    console.log(messages)
    console.log("currentMessage:")
    console.log(currentMessage)
    console.log("nextMessage:")
    console.log(nextMessage)
    
  },[messages])


  // ----------------------------------

  async function getMessagesNormal (character, numOfMessages, prompt=undefined, objectionResponse=false) {

    if(objectionResponse!=false){
      setMessages((messages)=>([...messages, objectionResponse]))
    } else{
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
    if (timeElapsed < MAXTIME && !objectionModeOn && currentMessageTmp.character != "judge"){
      setTimeElapsed((timeElapsed)=>(timeElapsed+currentMessageTmp.sentence.length))
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
      else if (messages[currentMessageIndex].character === "judge" && currentMessageTmp.type != "verdict" && currentMessageTmp.type != "adjourned"){
        if(randomNum < 70){
          getMessagesNormal("phoenix", 1)
        } else{
          getMessagesNormal("edgeworth", 1)
        }
      }
    }
  }
  
  function startObjection(){
    setCards([])
    setBlackout(!blackout)

    //setPhoenixAnimForce(true)
    dispatch(phoenixManualAnim())

    //setPhoenixAnim("deskslam")
    dispatch(phoenixAnimDeskslam())
    setTimeout(()=>{playDeskslamSound()}, 0.5)
    setObjectionForm(!objectionForm)
    setObjectionModeOn(true)
  }

  function doTheObjection(prompt){
    /*const max = 4
    const min = 1
    const randomNum = Math.ceil(Math.random()*(max - min) + min);*/
    setFetchingMessage(true)
    getMessagesNormal("phoenix", 1, prompt)
    //setPhoenixAnim("handsondesk")
    dispatch(phoenixAnimHandsondesk())
    setObjectionForm(false)
    setTimeout(()=>{dispatch(phoenixAnimObjection())}, 1250)
    setTimeout(()=>{setObjectionBubbleVisible(true);playPhoenixObjection()}, 1500)
    setTimeout(()=>{setBlackout(false)}, 1800)
    setTimeout(()=>{playCornered2()}, 1600)
    setTimeout(()=>{setObjectionBubbleVisible(false)}, 2200)
    //setTimeout(()=>{stop()}, 50000)
  }

  function slamDesk(){
    dispatch(phoenixManualAnim())
    dispatch(phoenixAnimDeskslam())
    playDeskslamSound()
    setTimeout(()=>{
      dispatch(phoenixAutoAnim())
    },1500)
  }

  // TODO
  async function getIPdata(){
    const IPdata = await fetchIPdata()
    console.log(IPdata)
  }

  // -------------------  RENDERING FUNCTIONS ------------------------


  const renderBlackout = () => {
    if (blackout){
      return(
        <div className="blackoutOn"></div>
      )
    } else{
      return <div style={styles.blackoutOff}></div>
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
          <div className="courtNotStartedMessage">
            <div className="quote-splash" style={{position:"absolute", right: -200, border:"solid", borderColor:"red"}}>
              <p>{randomQuote.quote}</p>
              <p>― {randomQuote.name} {`(est. ${randomQuote.date})`}</p>
            </div>
              <AwesomeButton 
                style={{position: "absolute", top: "80%", left: "50%", transform: "translate(-50%, -50%)"}}
                size="large"
                type="primary"
                disabled={backendOnline==true?false:true}
                onPress={()=>{
                    setTimeout(()=>{
                      dispatch(doorsOpen())
                      setCourtstarted(true)
                      startingDialogue()                    
                      setTimeout(()=>{setShowGavel(true)},1000)
                      setTimeout(()=>{dispatch(doorsDisappear())},3500)
                    }, 400)
                    
                  }
                }
                >
                  Let's go!
              </AwesomeButton>
          </div>
        </div>
      )
    }
  }
  
  async function getSignatureJson(name, microsecond){
    const response = await fetch(URL+`?name=${name}&microsecond=${microsecond}`)
    const json = await response.json()
    return json
  }

  const renderCardDiscardArea = () =>{
    if(acceptingCard){
      return(
        <div className="cardDiscardAreaActive"/>
      )
    }
  }

  //------------------------------------------------------------
  // {leaderboardVisible && <CourtTimeline messages={messages}/>}
  // {leaderboardVisible && <Leaderboard/>}

  return (
    <MantineProvider>
      <NotificationsProvider zIndex={99999}>
        <div className="App">
          {verdictTextVisible && <VerdictText verdict={verdict} setVerdictTextVisibile={setVerdictTextVisibile}></VerdictText>}
          {renderCourtNotStarted()}
          {confettiVisible && <CourtConfetti verdict={verdict}/>}
          <Doors doors={doors}></Doors>
          {audioDeskslam}
          {leaderboardVisible && <PostCourtView messages={messages}/>}
          <LeaderboardForm 
            showLeaderboardForm={leaderboardFormVisible} 
            setShowLeaderBoardForm={setLeaderboardFormVisible} 
            setLeaderboardVisible={setLeaderboardVisible} 
            phoenixScore={phoenixScore} 
            setLeaderboardScores={setLeaderboardScores}
            URL={URL}
            messages={messages}
            />
          
          <div className="mainView">
            <div className="phoenixScore"><p>{phoenixScore}</p></div>
            <div className="edgeworthScore"><p>{edgeworthScore}</p></div>
            <div className="courtView">
              {renderBlackout()}
              {renderObjectionForm()}
              {renderPromptForm()}
              {renderObjectionBubble()}
              <div className="defenceView">
                <DefenceView anim={phoenixAnim}></DefenceView>
              </div>

              <div className="prosecutionView">
                <ProsecutionView anim={edgeworthAnim}></ProsecutionView>
              </div>
              
              <div className="judgeView">
                {renderGavel()}
                <JudgeView anim={judgeAnim}></JudgeView>
              </div>
              {renderCardDiscardArea()}
            </div>
            <div className={objectionPoints>=OBJECTION_POINTS_MAX?"objectionMeterFull":"objectionMeter"} onClick={()=>{if(objectionPoints>=OBJECTION_POINTS_MAX && objectionModeOn == false){startObjection();console.log("HELLO")}}}>
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
              messageReady={messageReady}
              setMessageReady={setMessageReady}
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
            <div className="cardRow">
              <CardRow cards={cards} setCards={setCards} setCardDroppedText={setCardDroppedText} acceptingCard={acceptingCard} setAcceptingCard={setAcceptingCard}></CardRow>
            </div>
          </div>
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
