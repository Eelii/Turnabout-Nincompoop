import React, { useMemo } from "react"
import { animated, useTransition } from "react-spring"

const Message = ({
    message = "",
    trail = 35,
    setMessageReady,
    objectionModeOn
    }) => {
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