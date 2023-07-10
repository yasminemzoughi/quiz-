import React, { useEffect, useState } from "react";
import { questions } from "../../Components/MultiChoice/questions";
import PopUp from "../../Components/MultiChoice/PopUp/PopUp";
import {  Card } from "react-bootstrap";
import "./MultiChoice.css";
import FeedBack from "../../Components/MultiChoice/Feedback";
// import Timer from "../../Components/Timer/Timer";

const MultiChoice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //score
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  //feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  const [answerClicked, setAnswerClicked] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeIsUp, setTimeIsUp] = useState(false);

  

  const nextQuestion = currentQuestion + 1;
  const handleClick = (isCorrect, answerText) => {
    setAnswerClicked(true);
    if (isCorrect) {
      setScore(score + 1);
      setShowCorrectFeedback(true);
    } else {
      setShowIncorrectFeedback(true);
    }
    // Set background color for each answer option
    questions[currentQuestion].answerOptions.forEach((item) => {
      const button = document.getElementById(item.answerText);
      if (item.isCorrect) {
        button.style.backgroundColor = "lightgreen";
      } else if (item.answerText === answerText) {
        button.style.backgroundColor = "#FA9884";
      } else {
        button.style.backgroundColor = "#FA9884";
      }
    });

    setTimeout(() => {
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setShowCorrectFeedback(false);
        setShowIncorrectFeedback(false);
      } else {
        setShowScore(true);
      }
    }, 5000); // wait for 3 seconds before moving to next question
  };
  //reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
    setTimeLeft(30);
    setTimeIsUp(false);
  };

  return (
    <div className="main_content">
      {showScore ? (
        <PopUp
          score={score}
          reset={resetQuiz}
          timeLeft={timeLeft}
          timeIsUp={timeIsUp}
        />
      ) : (
        <div className="timer-card-wrap ">
          {/* <Timer timeLeft={timeLeft} /> */}
          <Card className="multichoice-quiz-Card">
            <section className="question-section">
              <h1>
                Question {currentQuestion + 1}/{questions.length}
              </h1>
              <h2 id="Question">{questions[currentQuestion].questionText}</h2>
            </section>

            <section className="answer-section">
              {questions[currentQuestion].answerOptions.map((item) => (
                <button
                  key={item.answerText}
                  id={item.answerText} 
                  className="Answerbutton"
                  onClick={() => handleClick(item.isCorrect, item.answerText)}
                >
                  {item.answerText}
                </button>
              ))}
            </section>
            {/* feedback */}
      <FeedBack/>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MultiChoice;
