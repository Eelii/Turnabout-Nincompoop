import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const CourtConfetti = () => {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      style={{zIndex:9999}}
      width={width}
      height={height}
    />
  )
}

export default CourtConfetti