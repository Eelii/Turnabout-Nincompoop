import './App.css';
import "react-awesome-button/dist/styles.css";
import React, { useState, useEffect } from "react"
import useSound from 'use-sound';
import ReactSlider from 'react-slider';
import ReactLoading from "react-loading";
import { AwesomeButton } from "react-awesome-button";
import musicCornered2 from "./assets/sounds/cornered2.mp3"
import musicTrial from "./assets/sounds/trial-looping.mp3"
import objectionSoundPhoenix from "./assets/sounds/objection_phoenix.mp3"
import DefenceView from './DefenceView';
import ProsecutionView from './ProsecutionView';
import JudgeView from './JudgeView';
import ObjectionMeter from './ObjectionMeter';
import ObjectionForm from './ObjectionForm';
import CardRow from './CardRow';
import TextBox from './TextBox';
import table from "./assets/imgs/site/table.jpg"
import handleKeyPressEvent from './handleKeyPressEvent';
import handleScore from './handleScore';
import objectionBubble from "./assets/anims/objection.gif"
import gavel from "./assets/anims/gavel.gif"
import gavelSound from "./assets/sounds/sfx-gavel.wav"
import TimeLeftBar from './TimeLeftBar';
import deskSlamSound from "./assets/sounds/sfx-deskslam.wav"
import { useSelector, useDispatch } from 'react-redux';
import { doorsClose, doorsDisappear, doorsOpen, phoenixAutoAnim } from './actions';
import LeaderboardForm from './LeaderboardForm';
import Doors from './Doors';
import CourtBackground from './CourtBackground';
import CourtConfetti from './CourtConfetti';
import PostCourtView from './PostCourtView';


import { NotificationsProvider, showNotification, updateNotification } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { Check, X , CaretUp, Volume, Volume2, Volume3, Prompt} from 'tabler-icons-react';
import { useKey } from 'react-use';
import { VerdictText } from './VerdictText';

import { phoenixStartTalking, phoenixStopTalking, phoenixAnimConfident, phoenixAnimHandsondesk, phoenixAnimNormal, phoenixAnimPointing, phoenixAnimReading, phoenixAnimSheepish, phoenixAnimSweating, phoenixAnimThinking, phoenixManualAnim, phoenixAnimDeskslam, phoenixAnimObjection, phoenixAnimOhShit} from "./actions"


function App() {
  const doors = useSelector(state=>state.doors)
  const URL = "http://localhost:5000"
  const TESTRESPONSE = {sentence:"(Can't go wrong with these notes!)", character:"phoenix", emoji_1:{emoji:"😊"}, emoji_2:{emoji:"😊"}, emoji_3:{emoji:"😊"}, for_judge: false, is_question: false, is_thought: false, shouting: false}
  const [phoenixAnim, setPhoenixAnim] = useState("normal")
  const [phoenixAnimForce, setPhoenixAnimForce] = useState(false)
  const [edgeworthAnim, setEdgeworthAnim] = useState("normal")
  const [edgeworthAnimForce, setEdgeworthAnimForce] = useState(false)
  const [judgeAnim, setJudgeAnim] = useState("normal")
  const [judgeAnimForce, setJudgeAnimForce] = useState(false)
  const [cards, setCards] = useState([])
  const CARDS_LIMIT = 5
  const [acceptingCard, setAcceptingCard] = useState(false)
  const [messageReady, setMessageReady] = useState(true)
  const [messages, setMessages]  = useState([TESTRESPONSE])
  const [objectionPoints, setObjectionPoints] = useState(160)
  const OBJECTION_POINTS_MAX = 150
  const OBJECTION_POINTS_DECAY = 20
  const [objectionModeOn, setObjectionModeOn] = useState(false)
  const [meterMode, setMeterMode] = useState("normal")
  const [currentMessageType, setCurrentMessageType] = useState(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [phoenixScore, setPhoenixScore] = useState(1)
  const [edgeworthScore, setEdgeworthScore] = useState(1)
  const [blackout, setBlackout] = useState(false)
  const [objectionFormVisible, setObjectionFormVisible] = useState(false)
  const [objectionFormText, setObjectionFormText] = useState("")
  const [promptForm, setPromptForm] = useState(false)
  const [promptFormText, setPromptFormText] = useState("")
  const [objectionBubbleVisible, setObjectionBubbleVisible] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const MAXTIME = 1000//1700
  const [fetchingMessage, setFetchingMessage] = useState(false)
  const [showGavel, setShowGavel] = useState(false)
  const [cardDroppedText, setCardDroppedText] = useState({text:"", objectionCard: false})

  const [randomQuote, setRandomQuote] = useState({quote:"", name:""})
  
  
  const [courtStarted, setCourtstarted] = useState(false)
  const [courtEnded, setCourtEnded] = useState(false)
  const [confettiVisible, setConfettiVisible] = useState(false)
  const [leaderboardFormVisible, setLeaderboardFormVisible] = useState(false)
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)


  const [leaderboardScores, setLeaderboardScores] = useState([])


  const [volume, setVolume] = useState(0)
  const [playMusicCornered2, {sound:musicCornered2Sound, stop:stopMusicCornered2}] = useSound(musicCornered2, {volume});
  const [playMusicTrial, {sound:musicTrialSound, stop:stopMusicTrial}] = useSound(musicTrial, {volume:volume, loop:true});
  const [playPhoenixObjection, {sound:phoenixObjectionSound, stop:stopPhoenixObjectionSound}] = useSound(objectionSoundPhoenix, {volume})
  const [playDeskSlamSound, {sound: deskSlamHowlerSound}] = useSound(deskSlamSound, {volume:volume})
  const [playGavelSound, { stopGavel }] = useSound(gavelSound, {volume:volume})

  const [backendOnline, setBackendOnline] = useState(undefined)
  const dispatch = useDispatch()
  const phoenix = useSelector(state=>state.phoenix)

  const [verdict, setVerdict] = useState(undefined)
  const [verdictTextVisible, setVerdictTextVisibile] = useState(false)
  const [fetchingVerdict, setFetchingVerdict] = useState(false)
  const [fetchingAdjourned, setFetchingAdjourned] = useState(false)

  const styles ={
    cardDeck:{
      position:"absolute",
      bottom:0,
      height:"25%",
      left: 10,
      right: 10,
      backgroundImage:`url(${table})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }
  }

  // -------------------- KEYBOARD EVENTS ---------------------------
  const normal = () =>{
    dispatch(phoenixManualAnim())
    dispatch(phoenixAnimOhShit())
    dispatch(()=>{
      dispatch(phoenixAutoAnim())
    },1500)
  }
  const addPointEdgeworth = () =>{
    setEdgeworthScore((edgeworthScore)=>edgeworthScore+1)
  }

  const addPointPhoenix = () =>{
    setPhoenixScore((phoenixScore)=>phoenixScore+1)
  }
  

  useKey('ArrowUp', handleKeyPressEvent);
  useKey("ArrowDown", normal)
  useKey("ArrowRight", addPointEdgeworth)
  useKey("ArrowLeft", addPointPhoenix)

  // ------------------------------------------------------------

  function createNewCard(text, objectionResponse=false){
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
      const newCard = createNewCard(response.sentence)
      newCard.type = "normal"
      if(cards.length <= CARDS_LIMIT){
        setCards((cards)=>([...cards, newCard]))
      }
    }
  } 

  async function addObjectionCardsToDeck(cardsAmount){
    for(let i=0; i<cardsAmount; i++){
      const response = await fetchObjectionCard()
      const newCard = createNewCard(response.sentence, response)
      newCard.type = "objection"
      console.log('Current cards length: ', cards.length);
      if(cards.length <= CARDS_LIMIT){
        console.log('Adding objection card...');
        setCards((cards)=>([...cards, newCard]))
      }
    }
  } 

  //------------------------------ FETCH FUNCTIONS ---------------------------------------


  async function fetchSentenceSpeaking(character, objectionModeOn=false, prompt=false){
    let response
    if (prompt){
      response = await fetch(objectionModeOn?`${URL}/getresponse/speaking?character=${character}&prompt=${prompt}`:`${URL}/getresponse/speaking?character=${character}&prompt=${prompt}`, {headers:{"Access-Control-Allow-Origin":"*"}})
    } else{
      response = await fetch(objectionModeOn&character=="phoenix"?`${URL}/getresponse/objection?character=${character}`:`${URL}/getresponse/speaking?character=${character}`, {headers:{"Access-Control-Allow-Origin":"*"}})
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
    //getIPdata()
    checkBackend()
    return()=>{console.log("clean up!")}
  },[])

  useEffect(()=>{
    fetchRandomTopQuote()
  },[backendOnline])

  useEffect(()=>{
    playMusicTrial()
  },[courtStarted])

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

    if(objectionModeOn===false){
      setTimeout(()=>{playMusicTrial()},4000)
    }
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
      setMeterMode("normal")
      musicCornered2Sound.fade(volume, 0, 3000);
      setTimeout(()=>{stopMusicCornered2()},3000)
    }
  },[objectionPoints])

  useEffect(()=>{

    if(currentMessageIndex > 2){
      handleScore(OBJECTION_POINTS_MAX, phoenixScore, edgeworthScore, setPhoenixScore, setEdgeworthScore, messages[currentMessageIndex], objectionPoints, setObjectionPoints, objectionModeOn)
    }

    const currentMessage = messages[currentMessageIndex]
    
    if(currentMessage.type == "verdict"){
      stopMusicCornered2()
      stopMusicTrial()
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
      if(verdict == "guilty"){
        dispatch(phoenixManualAnim())
        dispatch(phoenixAnimSweating())
      }
      if(verdict == "not guilty"){
        dispatch(phoenixManualAnim())
        dispatch(phoenixAnimConfident())
      }
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
    if(messages.length > currentMessageIndex+1 && acceptingCard == true){
      setAcceptingCard(false)
    }
    console.log("messages")
    console.log(messages)
    console.log("currentMessage:")
    console.log(currentMessage)
    console.log("nextMessage:")
    console.log(nextMessage)
    
  },[messages])


  // ----------------------------------

  async function getMessagesNormal (character, numOfMessages, prompt=undefined, objectionResponse=false) {

    if(objectionResponse){
      setMessages((messages)=>([...messages, objectionResponse]))
    } else{
      setFetchingMessage(true)
      if (prompt){
        for(let i = 0; i < numOfMessages; i++){
          let tmpMsg = await fetchSentenceSpeaking(character, objectionModeOn, prompt=prompt)
          tmpMsg.prompted = true
          setMessages((messages)=>([...messages, tmpMsg]))
        }
      } else{
        for(let i = 0; i < numOfMessages; i++){
          let tmpMsg = await fetchSentenceSpeaking(character, objectionModeOn)
          setMessages((messages)=>([...messages, tmpMsg]))
        }
      }
      setFetchingMessage(false)
    }
  }

  async function getVerdict(){
    setFetchingMessage(true)
    setFetchingVerdict(true)
    let verdictMsg = await fetchVerdict()
    verdictMsg.type = "verdict"
    setMessages((messages)=>([...messages, verdictMsg]))
    setFetchingMessage(false)
    setFetchingVerdict(false)
    return true
  }

  async function getAdjourned(){
    setFetchingMessage(true)
    setFetchingAdjourned(true)
    let adjournedMsg = await fetchAdjourned()
    adjournedMsg.type = "adjourned"
    setMessages((messages)=>([...messages, adjournedMsg]))
    setFetchingMessage(false)
    setFetchingAdjourned(false)
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
    else if(timeElapsed >= MAXTIME && objectionModeOn === false && currentMessageTmp.type != "verdict" && currentMessageTmp.type != "adjourned"){
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
    stopMusicTrial()
    setCards([])
    if(fetchingVerdict){
      setFetchingVerdict(false)
    }
    if(fetchingAdjourned){
      setFetchingAdjourned(false)
    }
    setFetchingAdjourned()
    setBlackout(!blackout)

    //setPhoenixAnimForce(true)
    dispatch(phoenixManualAnim())

    //setPhoenixAnim("deskslam")
    dispatch(phoenixAnimDeskslam())
    setTimeout(()=>{playDeskSlamSound()}, 0.5)
    setObjectionFormVisible(true)
    setAcceptingCard(false)
    setObjectionModeOn(true)
    //setFetchingVerdict(false)
    //setFetchingAdjourned(false)
  }

  function doTheObjection(prompt){
    /*const max = 4
    const min = 1
    const randomNum = Math.ceil(Math.random()*(max - min) + min);*/
    setFetchingMessage(true)
    getMessagesNormal("phoenix", 1, prompt)
    //setPhoenixAnim("handsondesk")
    dispatch(phoenixAnimHandsondesk())
    setObjectionFormVisible(false)
    setTimeout(()=>{dispatch(phoenixAnimObjection())}, 1250)
    setTimeout(()=>{setObjectionBubbleVisible(true);playPhoenixObjection()}, 1500)
    setTimeout(()=>{setBlackout(false)}, 1800)
    setTimeout(()=>{playMusicCornered2()}, 1600)
    setTimeout(()=>{
      setObjectionBubbleVisible(false)
      setMeterMode("objection")
    }, 2200)
    //setTimeout(()=>{stop()}, 50000)
  }

  function slamDesk(){
    dispatch(phoenixManualAnim())
    dispatch(phoenixAnimDeskslam())
    playDeskSlamSound()
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

  const renderFetchingVerdictText = () =>{
    if(fetchingVerdict == true){
      return(
        <p className="fetchingVerdictText">Fetching verdict</p>
      )
    }
  }
  const renderFetchingAdjournedText = () =>{
    if(fetchingAdjourned == true){
      return(
        <p className="fetchingVerdictText">Fetching adjourned</p>
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
      return(
        <div className="gavelDiv">
          <img style={{zIndex:1}} src={gavel}/>
        </div>
          )
    } else{
      return false
    }
  }

  const renderPreCourtView = () => {

    if(courtStarted === false){
      return(
        <div>
          <div className="appNameTextDiv">
            <div className="appNameText">Turnabout Nincompoop</div>
          </div>
          { randomQuote.quote !== "" &&
            <div className="quote-splash">
                <p style={{fontSize: 20, textShadow: "1px 1px white"}}>{randomQuote.quote}</p>
                <p style={{fontSize: 20, textShadow: "1px 1px white"}}>― {randomQuote.name} {`(est. ${randomQuote.date})`}</p>
            </div>
          }
          <div className="courtNotStartedMessage">
              <AwesomeButton 
                className="startCourtButton"
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
        <div className="cardDiscardAreaActive">
          <div className="cardDiscardAreaShadowInner"></div>
          <div className="cardDiscardAreaShadowOuter"></div>
          <CaretUp size={80} color="rgba(0, 255, 0, 0.818)" opacity={"50%"}></CaretUp>
        </div>
      )
    }
  }

  return (
    <MantineProvider>
      <NotificationsProvider zIndex={99999}>
        <div className="App">
          <CourtBackground/>
          {verdictTextVisible && <VerdictText verdict={verdict} setVerdictTextVisibile={setVerdictTextVisibile} volume={volume}></VerdictText>}
          {renderPreCourtView()}
          {confettiVisible && <CourtConfetti verdict={verdict}/>}
          <Doors doors={doors}></Doors>
          {leaderboardVisible && <PostCourtView messages={messages} phoenixScore={phoenixScore}/>}
          <LeaderboardForm 
            showLeaderboardForm={leaderboardFormVisible} 
            setShowLeaderBoardForm={setLeaderboardFormVisible} 
            setLeaderboardVisible={setLeaderboardVisible} 
            phoenixScore={phoenixScore} 
            setLeaderboardScores={setLeaderboardScores}
            URL={URL}
            messages={messages}
            verdict={verdict}
          />

          <div className="mainView">
            <div className="phoenixScore"><p>{phoenixScore}</p></div>
            <div className="edgeworthScore"><p>{edgeworthScore}</p></div>
            <div className="courtView">
              {renderFetchingVerdictText()}
              {renderFetchingAdjournedText()}
              {renderBlackout()}
              {objectionFormVisible && <ObjectionForm doTheObjection={doTheObjection}/>}
              {renderPromptForm()}
              {renderObjectionBubble()}
              <div className="defenceViewDiv">
                  <DefenceView anim={phoenixAnim}></DefenceView>
              </div>

              <div className="prosecutionViewDiv">
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
              volume={volume}
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
            {volume<=0?<Volume3 color="green"/>:null}
            {volume>0 && volume<=0.5?<Volume2 color="greenyellow"/>:null}
            {volume>0.5?<Volume color="lime"/>:null}
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
