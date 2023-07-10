import React from 'react'
import "./Timer.css"

const Timer = ({timeLeft}) => {
  return (
    <div className="wrapper">
    <div className="display">
      <div id="time"> Time left : {timeLeft} seconds</div>
    </div>
    <span></span>
    <span></span>
  </div>
  )
}

export default Timer
