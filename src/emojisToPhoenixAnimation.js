import {phoenixAnimNormal, phoenixStartTalking } from "./actions"
import { useSelector, useDispatch } from 'react-redux';

function emojisToPhoenixAnimation(emoji1, messageReadyState, objectionModeOn, currentAnim){
    if(messageReadyState==false){
        if(!objectionModeOn){
            if(emoji1=="😕"){
                return "thinkingTalking"
            }
            else if(emoji1=="😬" || emoji1=="😅" || emoji1== "😕" || emoji1=="🙊"){
                return "sheepishTalking"
            }
            else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😌" || emoji1=="😖" || emoji1== "💔"){
                return "sweatingTalking"
            }
            else if(emoji1 =="💪" || emoji1=="🙌" || emoji1 == "👊"){
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
        else {
            const randomNum = Math.ceil(Math.random()*(10 - 1) + 1);
            if(emoji1=="😕"){
                return "thinkingTalking"
            }
            else if(emoji1=="😬" || emoji1=="😅" || emoji1== "😕" || emoji1=="🙊"){
                return "sheepishTalking"
            }
            else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😌" || emoji1=="😖" || emoji1== "💔"){
                return "sweatingTalking"
            }
            else if(emoji1 =="💪" || emoji1=="🙌" || emoji1 == "👊"){
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
    }
    else if (messageReadyState==true){
        if (!objectionModeOn){
            if(emoji1=="😕"){
                return "thinking"
            }
            else if(emoji1=="😬"|| emoji1=="😅" || emoji1== "😕" || emoji1=="🙊"){
                return "sheepish"
            }
            else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😖" || emoji1=="😌" || emoji1== "💔"){
                return "sweating"
            }
            else if(emoji1 =="💪" || emoji1=="🙌" || emoji1=="👏" || emoji1 == "👊"){
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
        } else{
            if(emoji1=="😕"){
                return "thinking"
            }
            else if(emoji1=="😬"|| emoji1=="😅" || emoji1== "😕" || emoji1=="🙊"){
                return "sheepish"
            }
            else if(emoji1=="😳" || emoji1=="😞" || emoji1=="😖" || emoji1=="😌" || emoji1== "💔"){
                return "sweating"
            }
            else if(emoji1 =="💪" || emoji1=="🙌" || emoji1=="👏" || emoji1 == "👊"){
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


}

export default emojisToPhoenixAnimation