const TimeLeftBar = ({max, current}) => {
    const height = 10
    return(
    <div>
        <div style={{height: height, borderStyle: "solid", borderColor: "black", backgroundColor: "gray" }}>
            <div style={{backgroundColor:"blue", width: `${current/max*100}%`, maxWidth:`100%`, height: height}}></div>
        </div>
    </div>
    )
}

export default TimeLeftBar