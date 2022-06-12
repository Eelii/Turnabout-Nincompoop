import {useEffect, useState} from "react"
import CourtTimeline from "./CourtTimeline";
import LeaderboardTop20 from "./LeaderboardTop20";
import LeaderboardAll from "./LeaderboardAll";
import CourtEndedOverlay from "./CourtEndedOverlay";
import { Tabs, Button, Center, Drawer } from '@mantine/core';
import { ArrowsRight, ArrowsLeft } from 'tabler-icons-react';

const PostCourtView = ({messages}) =>{

    const [activeTab, setActiveTab] = useState({index:0,key:"TOP"})
    const [drawerOpened, setDrawerOpened] = useState(false);
    const onChange = (activeIndex, tabKey) => {
        setActiveTab({index:activeIndex, key:tabKey})
    }
    useEffect(()=>{
        console.log(drawerOpened);
    },[drawerOpened])

    return(

        <div style={{zIndex:10000, position:"absolute", width:"100vw", height:"100vh", borderStyle:"solid", borderColor:"red", borderWidth:2}}>
            <CourtEndedOverlay/>
            <Tabs initialTab={activeTab.index} active={activeTab} onTabChange={onChange} color="blue" style={{width:"100%"}}>
                <Tabs.Tab label="TOP 20" tabKey="TOP" style={{width:"50%", fontSize:30, backgroundColor:activeTab.key=="TOP"?"gray":"cyan", color:activeTab.key=="TOP"?"cyan":"gray", zIndex: 10001}}><LeaderboardTop20/></Tabs.Tab>
                <Tabs.Tab label="All scores" tabKey="ALL" style={{width:"50%", fontSize:30, backgroundColor:activeTab.key=="ALL"?"gray":"cyan", color:activeTab.key=="ALL"?"cyan":"gray", zIndex: 10001}}><LeaderboardAll/></Tabs.Tab>
            </Tabs>
            
            <Center style={{width: "100vw", zIndex: 10002}}>
                <Button variant="white" color="orange" rightIcon={drawerOpened?<ArrowsLeft/>:<ArrowsRight/>} style={{width:"20%"}} onClick={()=>{setDrawerOpened((drawerOpened)=>!drawerOpened)}}>{drawerOpened?"Close court dialogue":"Show court dialogue"}</Button>
            </Center>
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title="Court dialogue"
                padding="xl"
                size="25%"
                zIndex={10000}
            >
                {<CourtTimeline messages={messages}/>}
            </Drawer>
        </div>
    )
}

export default PostCourtView