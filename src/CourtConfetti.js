import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const CourtConfetti = (props) => {
  const verdict = props.verdict
  const { width, height } = useWindowSize()
  if(verdict=="guilty"){
    return (
      <Confetti
        style={{zIndex:9999}}
        width={width}
        height={height}
        wind={-0.2}
      />
    )
  }
  return (
    <Confetti
      style={{zIndex:9999}}
      width={width}
      height={height}
    />
  )
}

export default CourtConfetti