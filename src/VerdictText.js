import { useEffect, useRef } from "react"
import './App.css';

const VerdictText = (props) =>{

    const guiltyG = useRef(null)
    const guiltyU = useRef(null)
    const guiltyI = useRef(null)
    const guiltyL = useRef(null)
    const guiltyT = useRef(null)
    const guiltyY = useRef(null)
    const notGuiltyWord1 = useRef(null)
    const notGuiltyWord2 = useRef(null)
    const verdictLettersDivRef = useRef(null)
    const verdictWordsDivRef = useRef(null)
    const verdict = props.verdict
    const setVerdictTextVisibile = props.setVerdictTextVisibile
    
    useEffect(()=>{
        if(verdict != null){
            thumpVerdict()
        }
    },[verdict])

    const thumpVerdict = () =>{
        const guiltyLettersRefs = [guiltyG, guiltyU, guiltyI, guiltyL, guiltyT, guiltyY]
        const notGuiltyWordsRefs = [notGuiltyWord1, notGuiltyWord2]
        const slideDuration = 2
        if(verdict == "guilty"){
            let letterThumpTimeout = 600
            animSlide(verdictLettersDivRef, "in", slideDuration)
            setTimeout(()=>{
                for(let i = 0; i < guiltyLettersRefs.length; i++){
                    animThump(guiltyLettersRefs[i], letterThumpTimeout*(i+1))
                }
                const slideAndThumpDuration = slideDuration*1000+letterThumpTimeout*guiltyLettersRefs.length
                setTimeout(()=>{animSlide(verdictLettersDivRef, "out", slideDuration)},slideAndThumpDuration)
                setTimeout(()=>{setVerdictTextVisibile(false)},slideAndThumpDuration+slideDuration+1000)
            },slideDuration*1000)
        } else{
            let wordThumpTimeout = 1000
            animSlide(verdictWordsDivRef, "in", slideDuration)
            setTimeout(()=>{
            for(let i = 0; i < notGuiltyWordsRefs.length; i++){
                animThump(notGuiltyWordsRefs[i], wordThumpTimeout*(i+1), 2)
            }
            const slideAndThumpDuration = slideDuration*1000+wordThumpTimeout*notGuiltyWordsRefs.length
            setTimeout(()=>{animSlide(verdictWordsDivRef, "out", slideDuration)},slideAndThumpDuration)
            setTimeout(()=>{setVerdictTextVisibile(false)},slideAndThumpDuration+slideDuration+1000)
            },slideDuration*1000)
        }
    }

    const animSlide = (ref, direction, duration) => {
        if(direction == "in"){
            ref.current.className = "slidingIn"
            ref.current.style.animationDuration = duration+"s"
        }
        if(direction == "out"){
            ref.current.className = "slidingOut"
            ref.current.style.animationDuration = duration+"s"
        }
    }

    const animThump = (ref, timeout, thumpTime=undefined) =>{
        setTimeout(()=>{
            ref.current.style.animation = "thump"
            if(thumpTime){
                ref.current.style.animationDuration = thumpTime+"s"
            }
            ref.current.style.animationDuration = "1s"
            ref.current.style.visibility = "visible"
            ref.current.style.zIndex = 999998
            setTimeout(()=>{
                ref.current.style.animation = ""
                ref.current.style.animationDuration = ""
            },2000)
        },timeout)
    }

    if(verdict == "guilty"){
        return(
            <div id="verdictFrame">
                <div id="verdictLettersDiv" ref={verdictLettersDivRef}>
                    <p className="verdictLetter" ref={guiltyG}>G</p>
                    <p className="verdictLetter" ref={guiltyU}>U</p>
                    <p className="verdictLetter" ref={guiltyI}>I</p>
                    <p className="verdictLetter" ref={guiltyL}>L</p>
                    <p className="verdictLetter" ref={guiltyT}>T</p>
                    <p className="verdictLetter" ref={guiltyY}>Y</p>
                </div>
            </div>
        )
    } 
    else if(verdict == "not guilty"){
        return(
            <div id="verdictFrame">
                <div id="verdictWordsDiv" ref={verdictWordsDivRef}>
                    <p className="verdictWord" ref={notGuiltyWord1}>NOT</p>
                    <p className="verdictWord" ref={notGuiltyWord2}>GUILTY</p>
                </div>
            </div>
        )
    } else{
        return(null)
    }
}
    


    


export {VerdictText}