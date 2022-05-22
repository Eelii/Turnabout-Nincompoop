import CanvasDraw from "react-canvas-draw";
import { useState, useEffect, useRef } from "react";
import { Table } from "@mantine/core"

const Leaderboard = () =>{

    const BACKEND_URL = "http://localhost:5000"
    const signaturesRef = useRef([])
    const [leaderboardScores, setLeaderboardScores] = useState([])


    useEffect(()=>{
        getLeaderboardScores()
    },[])

    useEffect(()=>{
        if(leaderboardScores.length > 0){
            leaderboardScores.map((scoreData, index)=>{
            signaturesRef.current[index].loadSaveData(scoreData.signature)
          })
        }
    },[leaderboardScores])


    async function fetchLeaderboardScores(){
        let response = await fetch(`${BACKEND_URL}/topscores`)
        return response.json()
    }

    async function getLeaderboardScores(){
        const scoreDocs = await fetchLeaderboardScores()
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
        }
        setLeaderboardScores(leaderboardScoresTmp)
    }


    const userSignature = (index) => {
        return(
          <CanvasDraw
            style={{width: 200, height: 100, zIndex:1000, borderStyle:"solid", borderColor:"black"}}
            hideInterface={true}
            lazyRadius={0}
            brushRadius={1}
            hideGrid={true}
            disabled={true}
            ref={thisCanvas => signaturesRef.current[index] = thisCanvas} 
          />
        )
    }

    const rows = leaderboardScores.map((score, index) => (
      <tr key={score.name+score.microsecond}>
        <td>{score.score}</td>
        <td>{score.name}</td>
        <td>{score.country}</td>
        <td>
          {userSignature(index)}
        </td>
      </tr>
    ));

    return(
      <div>
          <div className="leaderboardDiv">
            <div className="leaderboardList">
            <Table fontSize={"xl"}>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            </div>
          </div>
      </div>
    )
}
export default Leaderboard