function emojisToEdgeworthAnimation(emoji1, messageReadyState){

    console.log("FUNCTION!!")
    console.log(emoji1)

    if(messageReadyState==false){

        if(emoji1=="😕"){
            return "thinkingTalking"
        }
        else if(emoji1=="😬" || emoji1=="😅"){
            return "thinkingTalking"
        }
        else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😌" || emoji1=="😖"){
            return "strainedTalking"
        }
        else if(emoji1 =="💪" || emoji1=="🙌"){
            return "pointingTalking"
        }
        else if(emoji1=="😏"){
            return "confidentTalking"
        }
        else if(emoji1=="😠" || emoji1=="😣" || emoji1=="😡" || emoji1=="😤"){
            return "handondeskTalking"
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
            return "thinking"
        }
        else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😖" || emoji1=="😌"){
            return "strained"
        }
        else if(emoji1 =="💪" || emoji1=="🙌"){
            return "pointing"
        }
        else if(emoji1=="😠" || emoji1=="😡" || emoji1=="😤"){
            return "handondesk"
        }
        else if(emoji1=="😏" || emoji1=="😉"){
            return "confident"
        }
        else if(emoji1=="😣"){
            return "handondesk"
        }
        else{
            return "normal"
        }
    }


}

export default emojisToEdgeworthAnimation