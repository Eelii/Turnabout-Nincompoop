import CanvasDraw from "react-canvas-draw";
import { AwesomeButton } from "react-awesome-button";
import React, { useState, useRef, useEffect } from "react"
import {Select, Image, Popover, Button, Text} from "@mantine/core"
import fax from "./assets/imgs/site/fax.png"
import phoenixProfile from "./assets/imgs/site/phoenix_profile.png"
import judgeProfile from "./assets/imgs/site/judge_profile.png"
import { loremIpsum } from 'react-lorem-ipsum';

const LeaderboardForm = ({showLeaderboardForm, setShowLeaderBoardForm, setLeaderboardVisible, phoenixScore, setLeaderboardScores, URL, messages, verdict}) =>{

    const [printNameInput, setPrintNameInput] = useState("")
    const [selectedMotto, setSelectedMotto] = useState(undefined)
    const [selectedCountry, setSelectedCountry] = useState(undefined)
    const [popoverMottoOpened, setPopoverMottoOpened] = useState(false)
    const [popoverFormOpened, setPopoverFormOpened] = useState(false)
    const [popoverJudgeOpened, setPopoverJudgeOpened] = useState(false)
    const [judgeWarningText, setJudgeWarningText]= useState("")
    const [judgeWarnings, setJudgeWarnings] = useState(0)
    const [popoverFormText, setPopoverFormText] = useState("(I should probably fill out this form)")
    const [formSigned, setFormSigned] = useState(false)
    const [lorem, setLorem] = useState(null)
    const canvasRef = useRef(null)

    let judgeWarningTexts = [
      "Your hand must have slipped. That's understandable, filling out documents can be quite difficult.",
      "Are you ok?",
      "Your signature can't possibly require that much space!",
      `MR. WRIGHT! STOP DRAWING POINTLESS THINGS ON THE DOCUMENT!`
    ]

    const warningsToExclamations = () => {
      let exclamations = ""
      for (let i=0; i >= judgeWarnings; i++){
        exclamations += "!"
      }
      return exclamations
    }
    


    async function postFormToDB(){
      const signatureJson = canvasRef.current.getSaveData()
      const bodyData = JSON.stringify({signature:signatureJson, name:printNameInput, score:phoenixScore, motto:selectedMotto, messages:messages})
      const response = await fetch(`${URL}/leaderboardform`, {method:"POST", body:bodyData, headers:{"Content-type": "application/json; charset=UTF-8","Access-Control-Allow-Origin":"*"}})
      return response.json()
    }    

    useEffect(()=>{
      setLorem(createLorem())
    },[])

    useEffect(()=>{
      setJudgeWarningText(judgeWarnings<=judgeWarningTexts.length-1?judgeWarningTexts[judgeWarnings-1]:judgeWarningTexts[judgeWarningTexts.length-1])
    },[judgeWarnings])

    useEffect(()=>{
      console.log(judgeWarnings);
    },[judgeWarnings])

    async function submitLeaderboardForm(){
        setShowLeaderBoardForm(false)
        const score = phoenixScore
        const scorePosted = await postFormToDB()
        if(scorePosted.status = "ok"){
            setLeaderboardVisible(true)
        }
    }

    const createLorem = () =>{
      return(
        loremIpsum({ p: 7, random:true }).map((text, index) => {
          return(
            <div style={{marginRight:"4%", marginLeft:"4%", marginTop:"1%", marginBottom:"1%", fontFamily:"Times New Roman, Times, serif"}} key={text}>
              {index+1} § <br/> {text}
            </div>
          )
          })
      )
    }

    const handleFormSubmit = () =>{
      console.log('HANDLE FORM');
      console.log("formSigned:", formSigned);
      console.log('');
      if(selectedMotto != undefined && printNameInput != "" && formSigned){
        submitLeaderboardForm()
      } else if(!formSigned && printNameInput == ""){
        setPopoverFormOpened(true)
      } else if(!formSigned){
        setPopoverFormText("(Documents are usually signed before submitting, I think.)")
        setPopoverFormOpened(true)
      } else if(printNameInput == ""){
        setPopoverFormText("(Even though I have an amazing signature, it's possible that someone might not be able to read my name with my signature alone.)")
        setPopoverFormOpened(true)
      } else if(selectedMotto == undefined){
        setPopoverMottoOpened(true)
      }
    }
    
    if (showLeaderboardForm === true){
        return(
          <div>            
            <Popover
              opened={popoverMottoOpened}
              onClose={() => setPopoverMottoOpened(false)}
              style={{position:"absolute", top: "40%", left: "5%", width: 300, zIndex: 10000}} 
              width={260}
              position="bottom"
              withArrow
              zIndex={999999}
              target={
                <Select 
                  label="How do you want to be quoted?" 
                  size="md" 
                  placeholder="Nulla poena sine lege" 
                  nothingFound="No dialogue found..." 
                  onDropdownOpen={()=>setPopoverMottoOpened(false)}
                  data={messages.filter((message,index)=>message.character=="phoenix" && index>0 && message.is_prompt != true).map((filteredMessage)=>({value:filteredMessage.sentence, label:filteredMessage.sentence, image:phoenixProfile}))}
                  onChange={(value)=>{setSelectedMotto(value)}}
                  zIndex={10000}
                />
              }
            >
              <div style={{ display: 'flex' }}>
                <Image
                  src={phoenixProfile}
                  width={30}
                  height={30}
                  sx={{ minWidth: 30 }}
                  mr="md"
                />
                <Text size="sm">{"(Huh? It's a drop-down list... I should probably select something.)"}</Text>
              </div>
            </Popover>

            <div className="leaderboardForm">
              <div className="leaderboardFormTextDiv">
                <div className="leaderboardFormHeading">
                  <p style={{fontSize:20, fontFamily:"Times New Roman, Times, serif"}}>CONGRATULATIONS</p>
                  <br/>
                  <p style={{fontSize:18, fontFamily:"Times New Roman, Times, serif"}}>You {verdict=="not guilty"?"won":"lost"}!</p>
                </div>
                <div className="leaderboardFormMainText">
                 {lorem}
                </div>
                <CanvasDraw
                  style={{height:"100%", width:"100%", position: "absolute", background:"argb(#00FFFFFF)"}}
                  hideInterface={true}
                  lazyRadius={0}
                  brushRadius={1}
                  hideGrid={true}
                  onChange={()=>{setPopoverJudgeOpened(true);setJudgeWarnings((judgeWarnings)=>judgeWarnings+1)}}
                />
              </div>
  
              <div className="userSignDiv">
                <div className="printNameDiv">
                  <input className="printNameInput" maxLength={15} type="text" value={printNameInput} onChange={(e)=>{setPrintNameInput(e.target.value)}}></input>
                  <p className="printNameText">Print name</p>
                </div>
                <div className="signatureDiv">
                  <div className="signatureArea">
                    <CanvasDraw 
                      style={{height:"100%", width:"100%"}}
                      hideInterface={false}
                      lazyRadius={0}
                      brushRadius={1}
                      hideGrid={true}
                      ref={canvasRef}
                      onChange={()=>{setFormSigned(true)}}
                    />
                  </div>
                  <div className="signatureLine"></div>
                  <p className="signatureText">Signature</p>
                </div>
              </div>
            </div>

            <Popover
              opened={popoverFormOpened}
              onClose={() => setPopoverFormOpened(false)}
              style={{position:"absolute", top: "40%", right: "30%", width: 300, zIndex: 10000}}
              width={260}
              position="right"
              withArrow
              zIndex={999999}
            >
              <div style={{ display: 'flex' }}>
                <Image
                  src={phoenixProfile}
                  width={30}
                  height={30}
                  sx={{ minWidth: 30 }}
                  mr="md"
                />
                <Text size="sm">{popoverFormText}</Text>
              </div>
            </Popover>

            <Popover
              opened={popoverJudgeOpened}
              onClose={() => setPopoverJudgeOpened(false)}
              style={{position:"absolute", top: "20%", right: "1%", width: 1, zIndex: 10000}}
              width={260}
              position="left"
              withArrow
              zIndex={999999}
            >
              <div style={{ display: 'flex' }}>
                <Image
                  src={judgeProfile}
                  width={30}
                  height={30}
                  sx={{ minWidth: 30 }}
                  mr="md"
                />
                <Text size="sm">{judgeWarningText}</Text>
              </div>
            </Popover>

            <div style={{zIndex: 10002, position:"absolute", top: "50%", left: "70%"}}>
              <AwesomeButton 
                size="large"
                type="primary"
                onPress={()=>{
                    handleFormSubmit()
                  }
                }
              >Submit
              </AwesomeButton>
            </div>
          </div>
        )
      } else {
          return null
      }

}

export default LeaderboardForm