import CanvasDraw from "react-canvas-draw";
import { AwesomeButton } from "react-awesome-button";
import React, { useState, useRef } from "react"
import {Select, Image, Popover, Button, Text} from "@mantine/core"
import fax from "./imgs/site/fax.png"
import phoenixProfile from "./imgs/site/phoenix_profile.png"


const LeaderboardForm = ({showLeaderboardForm, setShowLeaderBoardForm, setLeaderboardVisible, phoenixScore, setLeaderboardScores, URL, messages}) =>{

    const [printNameInput, setPrintNameInput] = useState("")
    const [selectedMotto, setSelectedMotto] = useState(undefined)
    const [popoverOpened, setPopoverOpened] = useState(false)
    const canvasRef = useRef(null)

    async function postFormToDB(){
      const signatureJson = canvasRef.current.getSaveData()
      const bodyData = JSON.stringify({signature:signatureJson, name:printNameInput, score:phoenixScore, motto:selectedMotto, messages:messages})
      const response = await fetch(`${URL}/leaderboardform`, {method:"POST", body:bodyData, headers:{"Content-type": "application/json; charset=UTF-8","Access-Control-Allow-Origin":"*"}})
      return response.json()
    }    

    async function submitLeaderboardForm(){
        setShowLeaderBoardForm(false)
        const score = phoenixScore
        const scorePosted = await postFormToDB()
        if(scorePosted.status = "ok"){
            setLeaderboardVisible(true)
        }
    }

    
    if (showLeaderboardForm === true){
        return(
          <div>
            <Image src={fax} fit="contain" width={"15vw"} style={{zIndex:99999, position:"absolute"}}></Image>
            
            <Popover
              opened={popoverOpened}
              onClose={() => setPopoverOpened(false)}
              style={{position:"relative", top: 400, width:400, zIndex:10000}} 
              target={<Select 
                label="How do you want to be quoted?" 
                size="md" 
                placeholder="Nulla poena sine lege" 
                nothingFound="No dialogue found..." 
                onDropdownOpen={()=>setPopoverOpened(false)}
                data={messages.filter((message,index)=>message.character=="phoenix" && index>0 && message.is_prompt != true).map((filteredMessage)=>({value:filteredMessage.sentence, label:filteredMessage.sentence, image:phoenixProfile}))}
                onChange={(value)=>{setSelectedMotto(value)}}
                zIndex={10000}
              />}
              width={260}
              position="bottom"
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
                <Text size="sm">{"(Huh? It's a drop-down list... I should probably select something.)"}</Text>
              </div>
            </Popover>
            <AwesomeButton style={{position:"absolute", zIndex: 100000}} onPress={()=>{console.log(messages.filter((message)=>message.character=="phoenix").map((filteredMessage)=>({value:filteredMessage.sentence, label:filteredMessage.sentence})))}}></AwesomeButton>
            <div className="leaderboardForm">
              <div className="leaderboardFormTextDiv">
                <div className="leaderboardFormHeading"><p style={{fontSize:10}}>HELDÖLKF</p></div>
                <div style={{width:"78%", display:"flex", justifyContent:"center", fontSize:6, position:"relative", top:"15%", left:"10%"}}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>
                <CanvasDraw
                  style={{height:"100%", width:"100%", zIndex:1000}}
                  hideInterface={true}
                  lazyRadius={0}
                  brushRadius={1}
                  hideGrid={true}
                />
              </div>
  
              <div className="userSignDiv">
                <div className="printNameDiv">
                  <p className="printNameText">Print Name</p>
                  <input className="printNameInput" maxLength={15} type="text" onChange={(e)=>{setPrintNameInput(e.target.value)}}></input>
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
                    />
                  </div>
                  <div className="signatureLine"></div>
                  <p className="signatureText">Signature</p>
                </div>
              </div>
            </div>
            <div style={{zIndex: 10002, position:"absolute", top: "50%", left: "70%"}}>
              <AwesomeButton 
                size="large"
                type="primary"
                onPress={()=>{
                    if(selectedMotto != undefined){
                      submitLeaderboardForm()
                    } else{
                      setPopoverOpened(true)
                      console.log(messages.filter((message,index)=>message.character=="phoenix" && index>0));
                    }
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