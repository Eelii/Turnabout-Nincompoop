import background from "./imgs/courtroom/defenseempty.png"

const DefenceBackground = () => {
    return <img src={background} style={{position:"absolute", zIndex:0, transform: "scale(1)"}}></img>
}

export default DefenceBackground