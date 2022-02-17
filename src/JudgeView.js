import Judge from "./Judge"
import JudgeBackground from './JudgeBackground';


function JudgeView({anim}){


    return(
        <div>
            <JudgeBackground/>
            <Judge anim={anim}/>
        </div>
    )
}

export default JudgeView