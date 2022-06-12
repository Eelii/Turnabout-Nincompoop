import CanvasDraw from "react-canvas-draw";
import { useState, useEffect, useRef } from "react";
import { Table, Center, Button, Text } from "@mantine/core"
import { Trophy, ThumbUp } from 'tabler-icons-react';
import "./App.css"

const LeaderboardTop20 = () =>{

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
        console.log('LB');
        console.log(leaderboardScores);
    },[leaderboardScores])


    async function fetchLeaderboardScores(){
        let response = await fetch(`${BACKEND_URL}/topscores`)
        return response.json()
    }

    async function likeQuote(documentID){
      let response = await fetch(`${BACKEND_URL}/like?id=${documentID}`)
      let json = await response.json()
    }

    async function getLeaderboardScores(){
        const scoreDocs = await fetchLeaderboardScores()
        let leaderboardScoresTmp = []
        for(let i = 0; i < scoreDocs.length; i++){
          let newScoreData =  {
            "id":scoreDocs[i]._id,
            "position":i+1,
            "score":scoreDocs[i].score,
            "name":scoreDocs[i].name,
            "date":scoreDocs[i].date,
            "country":scoreDocs[i].country,
            "motto":scoreDocs[i].motto,
            "signature":scoreDocs[i].signature,
            "likes":scoreDocs[i].likes
            //"microsecond":scoreDocs[i].microsecond
          }
          leaderboardScoresTmp.push(newScoreData)
        }
        setLeaderboardScores(leaderboardScoresTmp)
    }

    const updateScoreLikes = (scoreId) =>{
      const scoresTmp = leaderboardScores
      console.log('RETURN:');
      console.log(scoresTmp.map((score)=>{if(score.id == scoreId){return{...score, likes:score.likes+1}}else{return{score}}}));
      setLeaderboardScores(scoresTmp.map((score)=>{if(score.id == scoreId){return{...score, likes:score.likes+1}}else{return score}}))
    }

    const trophyIcon = (index) =>{
      switch(index){
        case 0:
          return(<Trophy style={{color:"#fee101"}}/>)
        case 1:
          return(<Trophy style={{color:"#d7d7d7"}}/>)
        case 2:
          return(<Trophy style={{color:"#d6af36"}}/>)
        default:
          return null
      }
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
      <tr key={JSON.stringify(score.signature)}>
        <td style={{fontSize:20}}>{score.position}</td>
        <td className={index==0?"gradientText":null} style={{fontSize:25}}>{score.score}</td>
        <td style={{textAlign:"left"}}>{trophyIcon(index)} {score.name}</td>
        <td>{score.country}</td>
        <td style={{fontSize:17}}>
          <i>{score.motto}</i>
          <br/>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <Button
              rightIcon={<ThumbUp/>}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              size="s"
              style={{height:"50%"}}
              onClick={()=>{likeQuote(leaderboardScores[index].id);updateScoreLikes(score.id)}}
            >Like
            </Button>
            <Text style={{height:"50%", marginLeft: 20, color:"lime"}}>+{score.likes}</Text>
          </div>
        </td>
        <td>
          {userSignature(index)}
        </td>
      </tr>
    ));

    return(
      <Center style={{width:"100%", height:"100%", position:"absolute"}}>
        <div className="leaderboardDiv">
          <div className="leaderboardList">
            <Table fontSize={"xl"}>
              <thead>
                <tr>
                  <th style={{textAlign:"center"}}>Position</th>
                  <th style={{textAlign:"center"}}>Score</th>
                  <th style={{textAlign:"center"}}>Name</th>
                  <th style={{textAlign:"center"}}>Country</th>
                  <th style={{textAlign:"center"}}>Motto</th>
                  <th>Signature</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
      </Center>
    )
}
export default LeaderboardTop20