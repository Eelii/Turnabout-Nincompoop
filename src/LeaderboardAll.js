import {useState, useEffect, useRef} from "react"
import { Center } from "@mantine/core"
import { AgGridReact } from'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const LeaderboardAll = () =>{

    const BACKEND_URL = "http://localhost:5000"
    const gridRef = useRef()
    const [leaderboardScores, setLeaderboardScores] = useState([])

    const columns = [
        {field:"position", headerName:"", sortable: true, flex: 1},
        {field:"score", headerName:"Score", filter: true, floatingFilter: true, sortable: true, flex: 2},
        {field:"name", headerName:"Name", filter: true, floatingFilter: true, sortable: true, flex: 3},
        {field:"country", headerName:"Country", filter: true, floatingFilter: true, sortable: true, flex: 2},
        {field:"motto", headerName:"Motto", filter: true, floatingFilter: true, sortable: true, flex: 8},
    ]

    useEffect(()=>{
        getLeaderboardScores()
    },[])

    async function fetchLeaderboardScores(){
        let response = await fetch(`${BACKEND_URL}/scores`)
        return response.json()
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
            "country":scoreDocs[i].country,
            "motto":scoreDocs[i].motto,
            "signature":scoreDocs[i].signature
            //"microsecond":scoreDocs[i].microsecond
          }
          leaderboardScoresTmp.push(newScoreData)
        }
        setLeaderboardScores(leaderboardScoresTmp)
    }

    return(
        <Center style={{width:"100%", height:"100%", position:"absolute"}}>
            <div className="ag-theme-material" style={{height: '1000px', width: '70%', margin: 'auto'}} >
                <AgGridReact 
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    columnDefs={columns} 
                    rowData={leaderboardScores}
                    floatingFilter={true}
                    animateRows={true}
                    rowDragManaged={true}
                />
            </div>
        </Center>
    )
}

export default LeaderboardAll