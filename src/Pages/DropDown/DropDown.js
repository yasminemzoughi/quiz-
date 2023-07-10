import React, { useEffect, useState } from "react";
import { questions } from "../../Components/DropDown/Questions";
import { Card } from "react-bootstrap";
import "./DropDown.css";
import PopUp from "../../Components/DropDown/PopUp";
import FeedBack from "../../Components/DropDown/FeedBack";
import { Progress } from "antd";

const DropDown = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [isSelected, setIsSelected] = useState(false);

  // modal for correct answer

  //score
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  //feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(
    Array(questions.length).fill(false)
  );

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (!showScore) {
      setShowScore(true);
      setTimeIsUp(true);
    }
  }, [timeLeft, showScore]);

  const handleAnswerSelect = (e) => {
    const newSelectedAnswers = [...selectedAnswers]; // Create a copy of selectedAnswers array
    newSelectedAnswers[currentQuestion] = e.target.value; // Update the selected answer for the current question
    setSelectedAnswers(newSelectedAnswers); // Update the state
    setIsSelected(true);
  };

  const currentQuestionData = questions[currentQuestion];
  const correctAnswer = currentQuestionData.answers.find(
    (answer) => answer.trueAnswer
  ).answer;
  const userAnswer = selectedAnswers[currentQuestion] === correctAnswer;

  const handleNextQuestion = () => {
    // Check if the selected answer is correct and update the score
    if (userAnswer) {
      setScore(score + 1);
      setShowCorrectFeedback(true);
      setIsSelected(true);
      setIsAnswerCorrect((prevIsAnswerCorrect) => {
        const updatedIsAnswerCorrect = [...prevIsAnswerCorrect];
        updatedIsAnswerCorrect[currentQuestion] = true; // Set the correctness for the current question
        return updatedIsAnswerCorrect;
      });
      console.log("Correct answer");
      console.log(userAnswer);
    } else {
      // wrong answer
      setIsSelected(true);
      setIsAnswerCorrect((prevIsAnswerCorrect) => {
        const updatedIsAnswerCorrect = [...prevIsAnswerCorrect];
        updatedIsAnswerCorrect[currentQuestion] = false; // Set the correctness for the current question
        return updatedIsAnswerCorrect;
      });
      console.log("Wrong answer");
      console.log(`Here's the correct answer: ${correctAnswer}`);
      setTimeout(() => {
        setShowIncorrectFeedback(true);
      }, 1000);
    }

    // Rest of your code...

    console.log(`your answer is ${selectedAnswers[currentQuestion]}`);
    // Move to the next question
    const nextQuestion = currentQuestion + 1;
    setTimeout(() => {
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswers([...selectedAnswers, ""]);
        setIsSelected(false);
        setShowNextButton(true); // Show the "Next" button again
      } else {
        setShowScore(true);
      }
    }, 3000); // wait for 2 seconds
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
    setTimeLeft(60);
    setTimeIsUp(false);
    setIsSelected(false);
    setSelectedAnswers(Array(questions.length).fill(""));
  };
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div>
      {showScore ? (
        <PopUp
          score={score}
          reset={resetQuiz}
          timeLeft={timeLeft}
          selectedAnswers={selectedAnswers}
          isAnswerCorrect={isAnswerCorrect}
        />
      ) : (
        <div>
          <div className="timer-card-wrap ">
            {/* <Timer timeLeft={timeLeft} /> */}
            {/* <Progress
              className="progressBary"
              percent={progress}
              status="active"
              strokeColor={{ from: "#47A992", to: "#245953" }}
              style={{width:"35%"}}
            /> */}
            <Card className="quiz-dropDown-card">
              <div className="progress-box">
                <h2 className="progress-title">Quiz Progress</h2>

                <div className="progress-bottom">
                  <span className="progress-big">
                    {currentQuestion + 1}/{questions.length}
                  </span>

                  <p className="progress-detail">
                    You are solving the {currentQuestion + 1} question out of a
                    total of {questions.length} questions
                  </p>
                </div>
              </div>

              <div className="question-section">
                <h4 className="question-count">
                  Question {currentQuestion + 1}/{questions.length}
                </h4>
                <div className="question-text">
                  {currentQuestionData.question}
                </div>
              </div>
              <div className="answer-section">
                <select
                  value={selectedAnswers[currentQuestion]}
                  onChange={handleAnswerSelect}
                  disabled={isSelected}
                >
                  <option value="">Select an answer</option>
                  {currentQuestionData.answers.map((answer, index) => (
                    <option key={index} value={answer.answer}>
                      {answer.answer}
                    </option>
                  ))}
                </select>
                {isSelected &&
                  !showCorrectFeedback &&
                  !showIncorrectFeedback && (
                    <button
                      className="quiz-dropDown-next-button"
                      onClick={handleNextQuestion}
                      disabled={!isSelected}
                    >
                      Next
                    </button>
                  )}
              </div>

              <FeedBack
                className="feedback"
                isSelected={isSelected}
                showCorrectFeedback={showCorrectFeedback}
                showIncorrectFeedback={showIncorrectFeedback}
                setShowCorrectFeedback={setShowCorrectFeedback}
                setShowIncorrectFeedback={setShowIncorrectFeedback}
                setShowNextButton={setShowNextButton} // Pass setShowNextButton to the FeedBack component
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
