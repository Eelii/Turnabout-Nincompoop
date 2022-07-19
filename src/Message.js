import React, { useMemo } from "react"
import { animated, useTransition } from "react-spring"
import useSound from 'use-sound';
import blip from "./assets/sounds/sfx-blipmale.wav"

const Message = ({
        message = "",
        trail = 35,
        setMessageReady,
        objectionModeOn,
        volume
    }) => {
    const [playBlipSound, {stopBlipSound}] = useSound(blip, {volume:volume>0?0.15:0})
    const items = useMemo(
        () => message.trim().split('').map((letter, index) => ({
            item: letter,
            key: index,
        })),
        [message]
    );
    
    if(objectionModeOn == true){
        trail = 25
    }

    const transitions = useTransition(items, {
        trail,
        from: { display: "none" },
        enter: { display: "" },
        onRest: (status, controller, item) => {
            if(item.key%2==0 && item.item != " "){
                playBlipSound()
            }
            if (item.key === items.length - 1) {
                setMessageReady(true)
            }
        },
    });

    return (
        <div>
            {transitions((styles, { item, key }) => (
                <animated.span key={key} style={styles}>
                    {item}
                </animated.span>
            ))}
        </div>
    );
};

export default Message;