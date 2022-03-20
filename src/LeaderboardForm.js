import CanvasDraw from "react-canvas-draw";
import { AwesomeButton } from "react-awesome-button";
import React, { useState, useRef } from "react"


const LeaderboardForm = ({showLeaderboardForm, setShowLeaderBoardForm, setShowLeaderboard, phoenixScore, setLeaderboardScores, URL}) =>{

    const [printNameInput, setPrintNameInput] = useState("")
    const canvasRef = useRef(null)

    async function fetchLeaderboardScores(){
        let response = await fetch(`${URL}/scores`)
        return response.json()
    }

    async function postFormToDB(){
      const signatureJson = canvasRef.current.getSaveData()
      const bodyData = JSON.stringify({signature:signatureJson, name:printNameInput, score:phoenixScore})
      const response = await fetch(`${URL}/leaderboardform`, {method:"POST", body:bodyData, headers:{"Content-type": "application/json; charset=UTF-8","Access-Control-Allow-Origin":"*"}})
      return response.json()
    }    

    async function submitLeaderboardForm(){
        setShowLeaderBoardForm(false)
        const score = phoenixScore
        const scorePosted = await postFormToDB()
        if(scorePosted.status = "ok"){
            getLeaderboardScores()
            setShowLeaderboard(true)
        }
    }

    async function getLeaderboardScores(){
        const scoreDocs = await fetchLeaderboardScores()
        console.log("LEADERBOARD SCORES FETCH")
        console.log(scoreDocs)
        let leaderboardScoresTmp = []
        for(let i = 0; i < scoreDocs.length; i++){
          let newScoreData =  {
            "id":scoreDocs[i]._id,
            "score":scoreDocs[i].score,
            "name":scoreDocs[i].name,
            "country":scoreDocs[i].country,
            "signature":scoreDocs[i].signature
            //"microsecond":scoreDocs[i].microsecond
          }
          leaderboardScoresTmp.push(newScoreData)
          console.log("TMP")
          console.log(leaderboardScoresTmp)
        }
        setLeaderboardScores(leaderboardScoresTmp)
    }

    if (showLeaderboardForm === true){
        return(
          <div>
            <div className="leaderboardFormBackground"></div>
            <div className="leaderboardForm">
              <div className="leaderboardFormTextDiv">
                <div className="leaderboardFormHeading"><p style={{fontSize:10}}>HELDÖLKF</p></div>
                <div style={{width:"78%", display:"flex", justifyContent:"center", fontSize:6, position:"absolute", top:"15%", left:"10%"}}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>
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
            <div style={{zIndex: 10000, position:"absolute", top: "40%", left: "70%"}}>
              <AwesomeButton 
                size="large"
                type="primary"
                onPress={()=>{
                    submitLeaderboardForm()
                  }
                }
              >Button
              </AwesomeButton>
            </div>
          </div>
        )
      } else {
          return null
      }

}

export default LeaderboardForm