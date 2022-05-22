const Doors = ({doors}) =>{
    if(doors.visible){
        if(doors.direction == "static"){
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
        
        else if(doors.direction == "open"){
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
        else if(doors.direction == "close"){
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
    } else if(!doors.visible){
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
}
export default Doors