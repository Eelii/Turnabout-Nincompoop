import { useSpring, animated, to } from 'react-spring'
import { useDrag, useGesture } from '@use-gesture/react'
import React, { useRef, useEffect, useState } from 'react'
import appStyles from "./App.css"


const styles = {
    card:{
        height:150, 
        width:150, 
        textAlign: "center",
        userSelect: "none",
        "boxShadow": "0px 3px 5px rgba(33,33,33,.7)"
    },  
    cardSmall:{
        position: "relative",
        height:150, 
        width:150, 
        cursor: "grab",
        textAlign: "center",
        userSelect: "none",
        bottom: 10,
        fontFamily: "'Shadows Into Light', cursive",
        fontSize: 20,
        display: "flex",
        justifyContent:"center",
        "boxShadow": "0px 3px 5px rgba(33,33,33,.7)"
    },
    cardNormalVisible:{
        position: "relative",
        height:150, 
        width:150, 
        cursor: "grab",
        textAlign: "center",
        userSelect: "none",
        bottom: 10,
        fontFamily: "'Shadows Into Light', cursive",
        fontSize: 20,
        display: "flex",
        justifyContent:"center",
        "boxShadow": "0px 3px 4px rgba(33,33,33,.7)"
    },
   
}

const postItColors = {
  0:"#ff7eb9", // pink
  1:"#ff65a3", // dark pink
  2:"#7afcff", // teal
  3:"#feff9c", // yellow
  4:"#fff740" // dark yellow
}

const Card = ({text, marginNum, colorNum, rotateNum, cards, setCards}) =>{
    //const randomColorNum = Math.floor(Math.random() * 5)
    //const randomMarginNum = Math.floor(Math.random() * 40) + 5;
    //const randomRotateNum = Math.floor(Math.random() * (5+5) - 5)
    const cardNormalVisible = styles.cardNormalVisible
    const cardNormalHidden = styles.cardNormalHidden
    cardNormalVisible.backgroundColor = postItColors[colorNum]
    cardNormalVisible.marginLeft = marginNum
    cardNormalVisible.transform = `rotate(${rotateNum}deg)`
    let cardNormalUniqueStyle = cardNormalVisible
    
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
    const [cardStyle, setCardStyle] = useState(cardNormalUniqueStyle)
    
    const bind = useGesture({
      onDrag: ({ down, movement: [mx, my] }) => (api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })),
      onDragEnd: (state) => {
          //console.log(`X: ${state.xy[0]} Y: ${state.xy[1]}`)
          //console.log(state)
          if(state.xy[1] < 310){
            // TODO: +text
            setCardStyle({...cardStyle, visibility:"hidden"})
            console.log(cardStyle)
            setTimeout(()=>{setCards(cards.filter((item) => (item.rotateNum !== rotateNum)))}, 1000)

          }
        }
      })

    return(
      <div>
      <animated.div
            {...bind()} 
            style={{...cardStyle, x, y}}
            >
              <p>{text}</p>
      </animated.div> 
      </div>
    )
}

/*
const CardHovering = ({text}) =>{
    
    const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20
    const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20
    const target = useRef(null)
    const [{ x, y, rotateX, rotateY }, api] = useSpring(
        () => ({
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        config: { mass: 5, tension: 350, friction: 40 },
        })
    )
  

useEffect(() => {
    const preventDefault = (e) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)

    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
    }
  }, [])

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { target, eventOptions: { passive: false } }
  )

  return (
    <div>
      <animated.div
        ref={target}
        style={{...styles.card, 
          transform: 'perspective(600px)',
          x,
          y,
          rotateX,
          rotateY,
        }}>
            <p>{text}</p>
      </animated.div>
    </div>
  )
}
*/
const getCard = (card, cards, setCards) => {
  return(<Card text={card.text} marginNum={card.marginNum} colorNum={card.colorNum} rotateNum={card.rotateNum} cards={cards} setCards={setCards}></Card>)
}

function CardRow({cards, setCards}){

  
    return(
      <div>
        <div style={{display:"flex", flexDirection:"row", }}>
            {cards.map(card =>(getCard(card, cards, setCards)))}
        </div>
      </div>
    )
}

export default CardRow