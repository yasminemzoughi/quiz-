import React, { useState } from 'react'
import './Progress.css'
import {questions} from "../DropDown/Questions"
const Progress = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div>
           <div className="progress-box">
        <div className="progress-top">
          <div className="progress-texts">
            <h2 className="progress-title">Quiz Progress</h2>

          </div>
          <div className="progress-icon">
            <i className="bi bi-bar-chart"></i>
          </div>
        </div>
        <div className="progress-bottom">
          <div
            className="progress-circle"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              "--value":
                ((currentQuestion + 1) / questions.length) * 100,
            }}
          >
            <span className="progress-big">{currentQuestion + 1}</span>
            <span className="progress-mini">/{questions.length}</span>
          </div>
          <p className="progress-detail">
            You solve the {currentQuestion + 1}. question out of a total of{" "}
            {questions.length} questions
          </p>
        </div>
      </div>
    </div>
  )
}

export default Progress
