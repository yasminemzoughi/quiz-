import React, { useEffect, useState } from "react";
import { question } from "../../Components/Select/question";
import {  Card } from "react-bootstrap";
import "../Select/Select.css";
import PopUp from "../../Components/Select/PopUp";
import Timer from "../../Components/Timer/Timer";
import { ToastContainer, toast } from "react-toastify";
import MyModal from "../../Components/Select/MyModal";

const Select = () => {
  const [questionsState, setQuestionsState] = useState(question);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //score
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  //feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(20);
  const [timeIsUp, setTimeIsUp] = useState(false);
  //modal for correct answer
  const [showModal, setShowModal] = useState(false);

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

  const handleOptionChange = (optionIndex) => {
    const newQuestions = [...questionsState];
    const selectedOptions = newQuestions[currentQuestionIndex].selected || [];
    const selectedIndex = selectedOptions.indexOf(optionIndex);

    if (selectedIndex >= 0) {
      selectedOptions.splice(selectedIndex, 1); // Remove the selected option
    } else {
      selectedOptions.push(optionIndex); // Add the selected option
    }

    newQuestions[currentQuestionIndex].selected = selectedOptions;
    setQuestionsState(newQuestions);
  };

  const currentQuestion = questionsState[currentQuestionIndex];
  const nextQuestion = currentQuestionIndex + 1;

  const handleClick = () => {
    if (currentQuestion.selected.length < 2) {
      toast.error("Please select at least two answers!", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      const selectedOptions = currentQuestion.selected.map(
        (selectedIndex) => currentQuestion.options[selectedIndex]
      );
  
      if (
        selectedOptions.every((selectedOption) =>
          currentQuestion.answer.includes(selectedOption)
        )
      ) {
        setScore(score + 1);
        setShowCorrectFeedback(true);
      } else {
        setShowIncorrectFeedback(true);
        setShowModal(true); // Show the modal when the answer is wrong
      }
  
      setTimeout(() => {
        if (nextQuestion < questionsState.length) {
          setCurrentQuestionIndex(nextQuestion);
          setShowCorrectFeedback(false);
          setShowIncorrectFeedback(false);
          setShowModal(false); // Close the modal when moving to the next question
        } else {
          setShowScore(true);
        }
      }, 3000); // wait for 3 seconds
    }
  };
  

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
    setTimeLeft(20);
    setTimeIsUp(false);
    setShowModal(false); // Close the modal when resetting the quiz
    const resetQuestions = questionsState.map((q) => ({
      ...q,
      selected: [],
    }));
    setQuestionsState(resetQuestions);
  };
  const correctAnswer = currentQuestion.answer;

  return (
    <div>
      {showScore ? (
        <PopUp
          score={score}
          reset={resetQuiz}
          timeLeft={timeLeft}
          timeIsUp={timeIsUp}
        />
      ) : (
        <div className="timer-card-wrap ">
          <Timer timeLeft={timeLeft} />
          <Card className="Select-card">
            <section className="question-section">
              <h3>select the correct answers</h3>

              <h5>
                Question {currentQuestionIndex + 1}/{question.length}:{" "}
                {currentQuestion.question}
              </h5>
            </section>

            <section className="answer-section">
              {currentQuestion.options.map((option, optionIndex) => (
                <div key={optionIndex} id="quiz-select-option">
                  <label htmlFor={`option-${optionIndex}`}>
                    <input
                      type="checkbox"
                      id={`option-${optionIndex}`}
                      name={currentQuestionIndex}
                      value={option}
                      checked={currentQuestion.selected.includes(optionIndex)}
                      onChange={() => handleOptionChange(optionIndex)}
                    />
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </section>
            <div id="quiz-select-buttons">
              <button id="select-button-next" onClick={handleClick}>
                Next
              </button>
            </div>
            {/* feedback */}
            <div >
              {showCorrectFeedback && (
                <div id="Great-work">
                  <p>Great work!</p>
                  <img
                    width={"40px"}
                    height={"40px"}
                    src="https://app.studysmarter.de/assets/gifs/emotes/confetti_ball.gif"
                    alt="correct"
                  />
                </div>
              )}
              {showIncorrectFeedback && (
                <div id="Almost-there">
                  <p>Almost there!</p>
                  <img
                    width={"40px"}
                    height={"40px"}
                    src="https://app.studysmarter.de/assets/gifs/emotes/upside_down_face.gif"
                    alt="incorrect"
                  />
                </div>
              )}
            </div>
          </Card>
          
          {/* Modal with the correct order */}
          <MyModal
          showModal={showModal}
          correctAnswer={correctAnswer}
          setShowModal={setShowModal}
          
          />
        </div>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default Select;
