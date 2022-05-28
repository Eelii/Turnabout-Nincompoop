import { Text, Avatar, Timeline, ScrollArea } from '@mantine/core';
import edgeworthProfile from "./imgs/site/edgeworth_profile.png"
import judgeProfile from "./imgs/site/judge_profile.png"
import phoenixProfile from "./imgs/site/phoenix_profile.png"

const CourtTimeline = ({messages}) =>{

    const timelineItem = (message) =>{
        let characterProfile
        if(message.character == "edgeworth"){
            characterProfile = edgeworthProfile
        } else if(message.character == "judge"){
            characterProfile = judgeProfile
        } else{
            characterProfile = phoenixProfile
        }

        return(
            <Timeline.Item
                title={message.character.charAt(0).toUpperCase()+message.character.slice(1)}
                bulletSize={24}
                bullet={
                    <Avatar
                        size={22}
                        radius="xl"
                        src={characterProfile}
                    />
                }
                >
                <Text color="dimmed" size="sm">
                    {message.sentence}
                </Text>
            </Timeline.Item>
        )
    }

    return(
            <ScrollArea style={{ height: "80vh", width: "95%", backgroundColor:"whitesmoke", borderRadius: 10}} offsetScrollbars>
                <Timeline type="auto">
                    {messages.filter((message, index)=>index>0).map((message)=>timelineItem(message))}
                </Timeline>
            </ScrollArea>
    )
}

export default CourtTimeline