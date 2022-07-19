import background from "./assets/imgs/courtroom/judgestand.png"

const JudgeBackground = () => {

    return(
        <div style={{width: 256, height: 192}}>
            <img src={background} style={{position:"absolute", transform: "scale(1)"}}></img>
        </div>
    )
}

export default JudgeBackground