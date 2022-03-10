


function handleScore(phoenixScore, edgeworthScore, setPhoenixScore, setEdgeworthScore, message, objectionPoints, setObjectionPoints, objectionModeOn){
    const emoji_score = {
        "🙌": 10,
        "😤": 7,
        "😠": 7,
        "😡": 7,
        "💪": 7,
        "😁": 5,
        "😏": 3,

    }
    const emoji_opposition_score = {
        "💔": 10,
        "🙊": 5,
        "😓": 5,
        "😞": 4,
        "😬": 3,
        "😔": 3,
        "😳": 2
    }
    const multiplier = 100
    const message_emoji_1 = message["emoji_1"].emoji
    const prob = message["emoji_1"].prob 

    if (Object.keys(emoji_score).includes(message_emoji_1)){
        if(message.character == "phoenix"){
            setPhoenixScore((phoenixScore) => { return phoenixScore + Math.floor(multiplier*prob+emoji_score[message["emoji_1"].emoji])})
            if(!objectionModeOn){
                setObjectionPoints((objectionPoints) => {return objectionPoints + Math.floor(multiplier*prob+emoji_score[message["emoji_1"].emoji])})
            }
        } else{
            setEdgeworthScore((edgeworthScore) => { return edgeworthScore + Math.floor(multiplier*prob+emoji_score[message["emoji_1"].emoji])})
        }
    }
    else if (Object.keys(emoji_opposition_score).includes(message_emoji_1)){
        if(message.character == "phoenix"){
            setEdgeworthScore((edgeworthScore) => {return edgeworthScore + Math.floor(multiplier*prob+emoji_opposition_score[message["emoji_1"].emoji])})
            if (!objectionModeOn){
                setObjectionPoints((objectionPoints) => {return objectionPoints - Math.floor(multiplier*prob+emoji_opposition_score[message["emoji_1"].emoji])})
            }
        } else{
            setPhoenixScore((phoenixScore) => {return phoenixScore + Math.floor(multiplier*prob+emoji_opposition_score[message["emoji_1"].emoji])})
            if (!objectionModeOn){
                setObjectionPoints((objectionPoints) => {return objectionPoints + Math.floor(multiplier*prob+emoji_opposition_score[message["emoji_1"].emoji])})
            }
        }
    } else{
        if(message.character == "phoenix"){
            setPhoenixScore((phoenixScore) => {return phoenixScore + Math.floor(multiplier*prob*0.5)})
            if (!objectionModeOn){
                setObjectionPoints((objectionPoints) => {return objectionPoints + Math.floor(multiplier*prob)})
            }
        } else{
            setEdgeworthScore((edgeworthScore) => {return edgeworthScore + Math.floor(multiplier*prob*0.5)})
        }
    }

}

export default handleScore