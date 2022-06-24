import Phoenix from "./Phoenix"
import DefenceBackground from './DefenceBackground';
import DefenceBench from './DefenceBench';
import { useSelector, useDispatch } from 'react-redux';
import { phoenixNormal, phoenixNormalTalking } from './actions';

function DefenceView({anim}){

    return(
        <div>
            <DefenceBackground/>
                <Phoenix/>
            <DefenceBench/>
        </div>
    )
}

export default DefenceView