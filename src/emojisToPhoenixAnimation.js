function emojisToPhoenixAnimation(emoji1, messageReadyState){

   
    if(messageReadyState==false){

        if(emoji1=="😕"){
            return "thinkingTalking"
        }
        else if(emoji1=="😬" || emoji1=="😅"){
            return "sheepishTalking"
        }
        else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😌" || emoji1=="😖" || emoji1== "💔"){
            return "sweatingTalking"
        }
        else if(emoji1 =="💪" || emoji1=="🙌"){
            return "pointingTalking"
        }
        else if(emoji1=="😠" || emoji1=="😡" || emoji1=="😤"){
            return "handsondeskTalking"
        }
        else if(emoji1=="😏"){
            return "readingTalking"
        }
        else if(emoji1 == "😉"){
            return "confidentTalking"
        }
        else{
            return "normalTalking"
        }
    }
    else if (messageReadyState==true){

        if(emoji1=="😕"){
            return "thinking"
        }
        else if(emoji1=="😬"|| emoji1=="😅"){
            return "sheepish"
        }
        else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😖" || emoji1=="😌" || emoji1== "💔"){
            return "sweating"
        }
        else if(emoji1 =="💪" || emoji1=="🙌" || emoji1=="👏"){
            return "pointing"
        }
        else if(emoji1=="😠" || emoji1=="😡" || emoji1=="😤"){
            return "handsondesk"
        }
        else if(emoji1=="😏"){
            return "reading"
        }
        else if(emoji1 == "😉"){
            return "confident"
        }
        else{
            return "normal"
        }
    }


}

export default emojisToPhoenixAnimation