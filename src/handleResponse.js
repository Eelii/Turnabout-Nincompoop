function handleResponse(response){

    response = response.replace(/(\r\n|\n|\r)/gm, "")

    const isQuestion = (response) => {
        if (response.substring(response.length-1) == "?" || response.substring(response.length-2) == "?"){
            return true
        } else{
            return false
        }
    }

    const isShouting = (response) => {
        if (response.substring(response.length-1) == "!"){
            return true
        } else{
            return false
        }
    }

    const isThought = (response) => {
        if (response.substring(response.length-1) == ")"){
            return true
        } else{
            return false
        }
    }

    const toJudge = (response) => {
        if(response.includes("Your Honor") || response.includes("your Honor")){
            return(true)
        } else{
            return false
        }
    }

    const question = isQuestion(response)
    const responseToJudge = toJudge(response)
    const thought = isThought(response)
    const shouting = isShouting(response)

    return({"to judge":responseToJudge, "is question":question, "is thought":thought, "is shouting":shouting})
}

export default handleResponse