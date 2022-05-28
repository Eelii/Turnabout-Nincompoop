import Phoenix from "./Phoenix"
import DefenceBackground from './DefenceBackground';
import DefenceBench from './DefenceBench';
import { useSelector, useDispatch } from 'react-redux';
import { phoenixNormal, phoenixNormalTalking } from './actions';

function DefenceView({anim}){

    const phoenixReducer = useSelector(state=>state.phoenix)
    return(
        <div style={{position:"relative", top:"43%"}}>
            <DefenceBackground/>
                <Phoenix phoenixReducer={phoenixReducer}/>
            <DefenceBench/>
        </div>
    )
}

export default DefenceView