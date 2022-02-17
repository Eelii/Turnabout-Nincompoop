import Edgeworth from "./Edgeworth"
import ProsecutionBackground from './ProsecutionBackground';
import ProsecutionBench from './ProsecutionBench';

function ProsecutionView({anim}){

    return(
        <div>
            <ProsecutionBackground/>
                <Edgeworth anim={anim}/>
            <ProsecutionBench/>
        </div>
    )
}

export default ProsecutionView