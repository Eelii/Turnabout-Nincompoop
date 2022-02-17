import background from "./imgs/courtroom/judgestand.png"

const JudgeBackground = () => {
    return <img src={background} style={{position:"absolute", zIndex:-100, transform: "scale(1)"}}></img>
}

export default JudgeBackground