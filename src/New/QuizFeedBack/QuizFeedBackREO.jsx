import React from "react";
import "./QuizFeedBack.css";
import { CheckCircle, CheckCircleFill, XCircle, XCircleFill } from "react-bootstrap-icons";

// Reorder === REO //
const QuizFeedBackREO = ({ questions, selectedAns }) => {

    console.log(questions)
    console.log(selectedAns)
  return (
    <div className="quiz-feedback">
      <div className="quiz-feed-card">
        {questions?.map((item, key) => {
          const selectedAnswer = selectedAns[key];

          const isAnswerCorrect =
            JSON.stringify(selectedAnswer?.slice()) ===
            JSON.stringify(item.correctOrder?.slice());

          return (
            <div key={key} className="quiz-feed-box">
              <div className="quiz-feed-box-header">
                <div className="quiz-icon">
                  {isAnswerCorrect ? (
                    <CheckCircleFill className="quiz-icon quiz-true" />
                  ) : (
                    <XCircleFill className="quiz-icon quiz-wrong" />
                  )}
                </div>
                <div className="quiz-feed-texts">
                  <span className="quiz-feed-count">Question {key + 1}</span>
                  <span className="quiz-feed-question">
                    {item?.questionText}
                  </span>
                </div>
              </div>
              <div className="quiz-checking-wrap">
                {isAnswerCorrect && selectedAns.length ? (
                  <span className="quiz-feed-answer-text quiz-true">
                    <CheckCircle className="quiz-true" />
                    {selectedAnswer?.slice().toString()}
                    {console.table(item.correctOrder)}
                  </span>
                ) : (
                  <div className="quiz-check-wrong">
                    {selectedAns.length ? (
                      <>
                        <span className="quiz-feed-answer-text quiz-wrong">
                          <XCircle className="quiz-wrong" />
                          {selectedAnswer?.slice().toString()}
                        </span>
                        <span className="quiz-feed-answer-text quiz-true">
                          <CheckCircle className="quiz-true" />
                          {item.correctOrder?.slice().toString()}
                        </span>
                      </>
                    ) : (
                      <span className="quiz-feed-answer-text quiz-true">
                        <CheckCircle className="quiz-true" />
                        {item.correctOrder?.slice().toString()}
                      </span>
                    )}
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

export default QuizFeedBackREO