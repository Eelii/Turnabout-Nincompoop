const Doors = ({doors}) =>{

    const doorsOpening = () =>{
        return(
        <div className="doorsDivVisible">
            <div className="openingDoorLeft">
                <div className="doorRectangle1Outer">
                    <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                    <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            <div className="openingDoorRight">
                <div className="doorRectangle1Outer">
                    <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                    <div className="doorRectangleInner"></div>  
                </div>  
            </div>
        </div>
        )
    }
    
    const doorsClosing = () =>{
        return(
            <div className="doorsDivVisible">
                <div className="closingDoorLeft">
                <div className="doorRectangle1Outer">
                <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            <div className="closingDoorRight">
                <div className="doorRectangle1Outer">
                <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            </div>
        )
    }
    
    const doorsHidden = () =>{
        return(
            <div className="doorsDivHidden">
                <div className="openingDoorLeft">
                <div className="doorRectangle1Outer">
                <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            <div className="openingDoorRight">
                <div className="doorRectangle1Outer">
                <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            </div>
        )
    }
    
    const doorsClosed = () =>{
        return(
            <div className="doorsDivVisible">
                <div className="staticDoorLeft">
                <div className="doorRectangle1Outer">
                <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            <div className="staticDoorRight">
                <div className="doorRectangle1Outer">
                <div className="doorRectangleInner"></div>  
                </div>
                <div className="doorRectangle2Outer">
                <div className="doorRectangleInner"></div>  
                </div>  
            </div>
            </div>
        )
    }

    if(doors.visible){
        if(doors.direction == "static"){
            return(doorsClosed())
        }
        
        else if(doors.direction == "open"){
            return(doorsOpening())
        }
        else if(doors.direction == "close"){
            return(doorsClosing())
        }
    } else if(!doors.visible){
        return(doorsHidden())
    }
}
export default Doors