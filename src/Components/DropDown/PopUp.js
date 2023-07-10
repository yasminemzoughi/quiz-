import React, { useState } from "react";
import Image from "../../Components/MyPics/bg.png";
import { questions } from "./Questions";
import { Card } from "react-bootstrap";
import "./Style.css";

const PopUp = (props) => {
  const { score, timeLeft, isAnswerCorrect, selectedAnswers } = props;
  const [showAnswers, setShowAnswers] = useState(false);

  let feedback, url;

  if (score === questions.length) {
    feedback = "Excellent job!";
    url = "https://media.giphy.com/media/y4PQTcLTYJwOI/giphy.gif";
  } else if (score >= questions.length / 2) {
    feedback = "Not bad, but you can do better!";
    url = "https://media.giphy.com/media/jurcfxao8M3yzHmCjS/giphy.gif";
  } else if (timeLeft === 0) {
    feedback = "Time's up! Try again!";
    url = "https://media.giphy.com/media/VEOPIjApsMIuwsAwJF/giphy.gif";
  } else {
    feedback = "Better luck next time!";
    url = "https://media.giphy.com/media/oubM1tKqnLW5G/giphy.gif";
  }

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  return (
    <div>
      <Card className="popUp-dropDown-card">
        <div className="result-box">
          <div className="result-bg">
            <span className="percentile">
              {Math.round((score / questions.length) * 100)}%
            </span>
            {/* <img src={Image} alt="result" /> */}
          </div>
          <p className="result-detail">
            You answered {score} out of {questions.length} questions correctly!
          </p>

          <div className="button-gif-container">
            <div className="horizontal-line"></div>
            <h2>{feedback}</h2>
            <img
              style={{ borderRadius: "6px" }}
              className="quiz-dropdown-gif"
              src={url}
              alt="gif"
            />
            <div className="button-container">
              <button
                className="quiz-dropdown-restart"
                onClick={() => props.reset()}
              >
                Try again
              </button>
              <button
                className="quiz-dropdown-check"
                onClick={handleShowAnswers}
              >
                Check your answers
              </button>
            </div>
          </div>

          {showAnswers && (
            <div className="check-answers-boxes">
              {questions.map((item, key) => {
                return (
                  <div
                    key={key}
                    className={
                      isAnswerCorrect[key]
                        ? "check-answer-box correct"
                        : "check-answer-box wrong"
                    }
                  >
                    <div className="check-answer-top">
                      <div className="check-texts">
                        <p className="check-answer-count">
                          Question: {key + 1}
                        </p>
                        <h3 className="check-answer-question">
                          {item.question}
                        </h3>
                      </div>
                      <div className="check-icon">
                        <i
                          className={
                            questions[key].answers.find(
                              (ans) => ans.trueAnswer === selectedAnswers[key]
                            )
                              ? "bi bi-check-lg"
                              : "bi bi-x-lg"
                          }
                        ></i>
                      </div>
                    </div>
                    <div className="check-answer-bottom">
                      <div className="answer-box">
                        <span className="answer-title">Your Answer</span>
                        <span className="answer-text">
                          {selectedAnswers[key]}
                        </span>
                      </div>
                      <div className="answer-box">
                        <span className="answer-title">Correct Answer</span>
                        <span className="answer-text">
                          {item.answers.map((ans) => {
                            return ans.trueAnswer ? ans.answer : null;
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PopUp;
