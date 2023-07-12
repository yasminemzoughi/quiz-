import React from "react";
import "./QuizFeedBack.css";
import { CheckCircle, CheckCircleFill, XCircle, XCircleFill } from "react-bootstrap-icons";

const QuizFeedBackTOF = ({questions , selectedAns}) => {

  return (
    <div className="quiz-feedback">
      <div className="quiz-feed-card">
        {questions?.map((item, key) => {
          return (
            <div key={key} className="quiz-feed-box">
              <div className="quiz-feed-box-header">
                <div className="quiz-icon">
                  {selectedAns[key] === item.isCorrect ? 
                    <CheckCircleFill className="quiz-icon quiz-true" />
                  : 
                    <XCircleFill className="quiz-icon quiz-wrong" />
                  }
                </div>
                <div className="quiz-feed-texts">
                  <span className="quiz-feed-count">Question {key + 1}</span>
                  <span className="quiz-feed-question">
                    {item?.questionText}
                  </span>
                </div>
              </div>
              <div className="quiz-checking-wrap">
                {selectedAns[key] === item.isCorrect && selectedAns.length ? (
                  <span className="quiz-feed-answer-text quiz-true">
                    {" "}
                    <CheckCircle className="quiz-true"/>
                    {selectedAns[key]?.toString()}
                  </span>
                ) : (
                  <div className="quiz-check-wrong">

                    {selectedAns.length ? <>
                      <span className="quiz-feed-answer-text quiz-wrong">
                    <XCircle className="quiz-wrong"/>
                      {selectedAns[key]?.toString()}
                    </span>
                    <span className="quiz-feed-answer-text quiz-true">
                    <CheckCircle className="quiz-true"/>
                      {item.isCorrect?.toString()}
                    </span>
                    </> : 
                   
                    <span className="quiz-feed-answer-text quiz-true">
                    <CheckCircle className="quiz-true"/>
                      {item.isCorrect?.toString()}
                    </span> }
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default QuizFeedBackTOF