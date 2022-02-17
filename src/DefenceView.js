import Phoenix from "./Phoenix"
import DefenceBackground from './DefenceBackground';
import DefenceBench from './DefenceBench';

function DefenceView({anim}){


    return(
        <div style={{position:"relative", top:"43%"}}>
            <DefenceBackground/>
                <Phoenix anim={anim}/>
            <DefenceBench/>
        </div>
    )
}

export default DefenceView