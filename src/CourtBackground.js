import courtImg from "./assets/imgs/site/supreme_court.JPG"
import { Image } from "@mantine/core"
const CourtBackground = () =>{
    return(
        <Image 
            src={courtImg}
            fit="cover"
            style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                filter: "blur(4px)"
            }}
        />
    )
}

export default CourtBackground