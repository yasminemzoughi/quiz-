import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Dragdrop.css";
import { Card } from "react-bootstrap";
import { questions } from "../../Components/DragDrop/questions";
import Timer from "../../Components/Timer/Timer";
import PopUp from "../../Components/DragDrop//PopUp";
import { ToastContainer, toast } from "react-toastify";
import MyModal from "../../Components/DragDrop//MyModal";
import FeedBack from "../../Components/DragDrop//FeedBack";
import { Progress } from "antd";

const Dragdrop = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // score
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // modal for correct answer
  const [showModal, setShowModal] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  // feedback
  const [answerDropped, setAnsweDropped] = useState(false);
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);

  // timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setCorrectAnswer([]);
  };

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    setAnsweDropped(true);
    const { source, destination } = result;
    // copy the questions
    const currentQuestionData = questions[currentQuestion];
    const updatedAnswers = [...currentQuestionData.answers];
    // drag the answer
    const [draggedAnswer] = updatedAnswers.splice(source.index, 1);
    // put it back in the drop area
    updatedAnswers.splice(destination.index, 0, draggedAnswer);
    const updatedQuestionData = {
      ...currentQuestionData,
      answers: updatedAnswers,
    };
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = updatedQuestionData;
    setSelectedAnswer(draggedAnswer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      setShowModal(false);
      toast.error("Please select an answer!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    if (selectedAnswer.isCorrect) {
      setScore(score + 1);
      setShowCorrectFeedback(true);
    } else {
      setShowIncorrectFeedback(true);
      setTimeout(() => {
        setShowModal(true);
      }, 5000);
      setCorrectAnswer(
        currentQuestionData.answers
          .filter((answer) => answer.isCorrect)
          .map((answer) => answer.text)
      );
    }

    setTimeout(() => {
      setShowModal(false);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setShowCorrectFeedback(false);
        setShowIncorrectFeedback(false);
      } else {
        setShowScore(true);
      }

      setSelectedAnswer(null);
    }, 4000);
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
    setTimeIsUp(false);
    setSelectedAnswer(null);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
  };
  const currentQuestionData = questions[currentQuestion];

  const questionParts = currentQuestionData.question.includes("____")
    ? currentQuestionData.question.split("____")
    : [currentQuestionData.question];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="main_content">
      {showScore ? (
        <PopUp
          score={score}
          timeLeft={timeLeft}
          timeIsUp={timeIsUp}
          reset={resetQuiz}
        />
      ) : (
        <div className="timer-card-wrap ">
          <Timer timeLeft={timeLeft} />
          <Card className="mycard-DND">
            <Progress
              className="progressBar"
              percent={progress}
              status="active"
              strokeColor={{ from: "#108ee9", to: "#87d068" }}
            />
            <Card.Body>
              <h4>Question {" "}
                {currentQuestion + 1}/{questions.length}{" "}
                {currentQuestion.question}
              </h4>
              <h3>Fill in the blanks with the following options</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="answers">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="draggable-choice"
                    >
                      {currentQuestionData.answers.map((answer, index) => (
                        <Draggable
                          key={answer.id}
                          draggableId={answer.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="mylist"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {answer.text}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
                <div className="drop-area">
                  <Droppable droppableId="drop-area">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="drop-area"
                      >
                        {selectedAnswer ? selectedAnswer.text : ""}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
              {questionParts.map((part, index) => (
                <div key={index}>
                  {part}
                  {index === questionParts.length - 1 ? "" : "____"}
                </div>
              ))}
            </Card.Body>
            <div>
              <button id="quiz-dnd-next" onClick={handleNextQuestion}>
                submit
              </button>
            </div>
            <FeedBack
              answerDropped={answerDropped}
              showCorrectFeedback={showCorrectFeedback}
              showIncorrectFeedback={showIncorrectFeedback}
            />
          </Card>
          {/* Modal with the correct order */}
          <MyModal
            showModal={showModal}
            correctAnswer={correctAnswer}
            handleClose={handleClose}
          />
        </div>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default Dragdrop;
