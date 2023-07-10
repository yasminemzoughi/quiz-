import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import "../Reorder/Reorder.css";
import PopUp from "../../../Components/ReorderQuiz/PopUp";
import { questions } from "../../../Components/ReorderQuiz/Questions";
import Timer from "../../../Components/Timer/Timer";
import { Progress } from "antd";
import MyModal from "../../../Components/ReorderQuiz/MyModal";
import FeedBack from "../../../Components/ReorderQuiz/FeedBack";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "lightyellow",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightblue",
  padding: grid,
  width: 250,
});

const Reorder = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerOrder, setAnswerOrder] = useState([]);
  // score
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // modal for correct answer
  const [showModal, setShowModal] = useState(false);
  const [correctOrder, setCorrectOrder] = useState([]);
  // timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const handleClose = () => setShowModal(false);
  // feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);

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

  useEffect(() => {
    setAnswerOrder(questions[currentQuestionIndex].answers);
  }, [currentQuestionIndex]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedAnswers = reorder(
      answerOrder,
      result.source.index,
      result.destination.index
    );

    // update state with the new order
    setAnswerOrder(reorderedAnswers);
  };

  // next question
  const onNextQuestion = () => {
    // correct answer ? score+1 / don't show modal / go to next question
    const nextQuestion = currentQuestionIndex + 1;
    const correctOrder = questions[currentQuestionIndex].correctOrder;
    if (JSON.stringify(answerOrder) === JSON.stringify(correctOrder)) {
      setScore(score + 1);
      setShowModal(false);
      setShowCorrectFeedback(true);
      setShowIncorrectFeedback(false);
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setShowScore(true);
      }
    } else {
      // wrong answer ? show modal + wait 3sec / go to next question
      setShowModal(true);
      setCorrectOrder(correctOrder);
      setShowCorrectFeedback(false);
      setShowIncorrectFeedback(true);
      setTimeout(() => {
        setShowModal(false);
        if (nextQuestion < questions.length) {
          setCurrentQuestionIndex(nextQuestion);
          setAnswerOrder(questions[nextQuestion].answers);
          setShowCorrectFeedback(false);
          setShowIncorrectFeedback(false);
        } else {
          setShowScore(true);
        }
      }, 3000); // wait for 3 seconds before moving to the next question
    }
  };
  

  // reset quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
    setTimeIsUp(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
  };
  const droppableId = `droppable-${currentQuestionIndex}`;
  const currentQuestion = questions[currentQuestionIndex];

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
          <div className="card-progressBar-container">
            <Progress
              className="progressBar"
              percent={progress}
              status="active"
              strokeColor={{ from: "#108ee9", to: "#87d068" }}
            />
            <Card className="reorder-quiz-Card">
              <div className="quiz-reorder-titel">
                <h2>
                  Question {currentQuestionIndex + 1}/{questions.length}
                </h2>
                <h3>{currentQuestion?.question}</h3>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={droppableId}>
                  {(provided, snapshot) => (
                    <ul
                      className="answers_container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {answerOrder.map((answer, index) => (
                        <Draggable
                          key={answer}
                          draggableId={answer}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="answer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {answer}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              {!showModal && (
                <button id="quiz-reorder-submit" onClick={onNextQuestion}>
                  Next Question
                </button>
              )}
              {/* feedback */}
              <FeedBack 
            
                answerDropped={answerOrder.length > 0} // Show feedback when answer is dropped
                showCorrectFeedback={showCorrectFeedback}
                showIncorrectFeedback={showIncorrectFeedback}
                setShowCorrectFeedback={setShowCorrectFeedback}
                setShowIncorrectFeedback={setShowIncorrectFeedback}
              />
            </Card>
          </div>
          {/* Modal with the correct order */}
          <MyModal
            showModal={showModal}
            setShowModal={setShowModal}
            correctOrder={correctOrder}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default Reorder;
