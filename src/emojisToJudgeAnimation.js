function emojisToJudgeAnimation(emoji1, messageReadyState){

    if(messageReadyState==false){
        switch(emoji1){
            case "😳":
                return "surprisedTalking"
            case "😌":
            case "🙈":
                return "warningTalking"
            default:
                return "normalTalking"
        }

    }
    else if (messageReadyState==true){
        switch(emoji1){
            case "😳":
                return "surprised"
            case "😌":
            case "🙈":
                return "warning"
            default:
                return "normal"
        }
    }

}

export default emojisToJudgeAnimation