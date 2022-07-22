import { useSpring, animated } from 'react-spring'
import { useGesture } from '@use-gesture/react'
import React, { useState } from 'react'
import ReactLoading from 'react-loading';


const styles = {
    card:{
        height:150, 
        width:150, 
        textAlign: "center",
        userSelect: "none",
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
        zIndex: 100000,
        "boxShadow": "0px 3px 4px rgba(33,33,33,.7)"
    }
}

const postItColors = {
  0:"#ff7eb9", // pink
  1:"#ff65a3", // dark pink
  2:"#7afcff", // teal
  3:"#feff9c", // yellow
  4:"#fff740" // dark yellow
}

const Card = ({text, marginNum, colorNum, rotateNum, cards, setCards, setCardDroppedText, acceptingCard, setAcceptingCard, objectionCard}) =>{
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
          if(state.xy[1] < 500 && acceptingCard === true){
            if(!objectionCard){
              setCardDroppedText({text:text, objectionCard:false}) 
            } else{
              setCardDroppedText({text:text, objectionCard:objectionCard})
            }
            setAcceptingCard(false)
            setTimeout(()=>{setCards(cards.filter((item) => (item.text != text)))}, 1000)
          }
        }
    })
    
    if(!objectionCard){
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
    } else{
      return(
        <div>
          <animated.div {...bind()} style={{...cardStyle, x, y}}>
                  <p className="gradientText">{text}</p>
          </animated.div> 
        </div>
      )
    }
}


const getCard = (card, cards, setCards, setCardDroppedText, acceptingCard, setAcceptingCard) => {
  return(<Card text={card.text} marginNum={card.marginNum} colorNum={card.colorNum} rotateNum={card.rotateNum} cards={cards} setCards={setCards} setCardDroppedText={setCardDroppedText} acceptingCard={acceptingCard} setAcceptingCard={setAcceptingCard} objectionCard={card.response}></Card>)
}

function CardRow({cards, setCards, setCardDroppedText, acceptingCard, setAcceptingCard}){

    return(
      <div>
        <div style={{display:"flex", flexDirection:"row", }}>
            {cards.map(card =>(getCard(card, cards, setCards, setCardDroppedText, acceptingCard, setAcceptingCard)))}
        </div>
      </div>
    )
}

export default CardRow