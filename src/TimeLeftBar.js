import { Progress } from '@mantine/core';

const TimeLeftBar = ({max, current}) => {
    const percentageFull = 100/(max/current)
    
    if (percentageFull < 60){
        return(
            <Progress color="indigo" value={percentageFull} />
        )
    } else if(percentageFull < 70){
        return(
            <Progress color="orange" value={percentageFull} />
        )
    } else if(percentageFull < 80){
        return(
            <Progress color="pink" value={percentageFull} />
        )
    } else{
        return(
            <Progress color="red" value={percentageFull} />
        )
    } 
}

export default TimeLeftBar