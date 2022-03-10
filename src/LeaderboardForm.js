import CanvasDraw from "react-canvas-draw";
import { AwesomeButton } from "react-awesome-button";
import React, {useState} from "react"


const LeaderboardForm = ({showLeaderboardForm, setShowLeaderBoardForm, setShowLeaderboard, phoenixScore, setLeaderboardScores, URL}) =>{

    const [printNameInput, setPrintNameInput] = useState("")

    async function fetchLeaderboardScores(){
        let response = await fetch(`${URL}/scores`)
        return response.json()
    }

    async function postScore(scoreData){
        const response = await fetch(`${URL}/scores?put=true&score=${scoreData.score}&name=${scoreData.name}`)
        return response.json()
    }    

    async function submitLeaderboardForm(){
        setShowLeaderBoardForm(false)
        const score = phoenixScore
        const scorePosted = await postScore({name:printNameInput, score:score})
        if(scorePosted.status = "ok"){
            getLeaderboardScores()
            setShowLeaderboard(true)
        }
    }

    async function getLeaderboardScores(){
        let scoreDocs = await fetchLeaderboardScores()
        for(let i = 0; i < scoreDocs.length; i++){
          setLeaderboardScores((leaderboardScores)=>(
            [...leaderboardScores, 
            { "id":scoreDocs[i]._id,
              "score":scoreDocs[i].score,
              "name":scoreDocs[i].name,
              "country":scoreDocs[i].country,
              //"datetime":scoreDocs[i].datetime
            }
            ]))
        }
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