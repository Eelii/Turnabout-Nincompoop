import background from "./imgs/courtroom/prosecutorempty.png"

const ProsecutionBackground = () => {
    return <img src={background} style={{position:"absolute", zIndex:-100, transform: "scale(1)"}}></img>
}

export default ProsecutionBackground