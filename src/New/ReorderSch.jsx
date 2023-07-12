import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { Progress } from "antd";
import Timer from "../../../Components/Quiz/Timer/Timer";
import QuizScore from "../QuizFeedBack/QuizScore";
import QuizFeedBackMC from "../QuizFeedBack/QuizFeedBackMC";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import QuizFeedBackREO from "../QuizFeedBack/QuizFeedBackREO";

const QuizInfo = {
  QuizTime: 500,
  questions: [
    {
      questionText: "Put the following colors in alphabetical order.",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
      hasPhoto: true,
      answer: ["Green", "Orange", "Blue"],
      correctOrder: ["Blue", "Green", "Orange"],
    },
    {
      questionText:
        "Put the following animals in order from smallest to largest.",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
        hasPhoto: false,
      answer: ["Cat", "Ant", "Rat"],
      correctOrder: ["Ant", "Rat", "Cat"],
    },
    {
      questionText:
        "Put the following planets in order from closest to farthest from the sun.",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
        hasPhoto: true,
      answer: ["Venus", "Mercury", "Earth", "Mars"],
      correctOrder: ["Mercury", "Venus", "Earth", "Mars"],
    },
    {
      questionText:
        "Put these mammals in order of their average speed, from slowest to fastes.",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
        hasPhoto: true,
      answer: ["Cheetah", "Human", "Sloth", "Blue Whale"],
      correctOrder: ["Sloth", "Human", "Blue Whale", "Cheetah"],
    },
  ],
};

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

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
});

const ReorderSch = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerOrder, setAnswerOrder] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);
  // score
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // modal for correct answer
  const [showModal, setShowModal] = useState(false);
  const [correctOrder, setCorrectOrder] = useState([]);
  // timer
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
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
    setAnswerOrder(QuizInfo.questions[currentQuestionIndex].answer);
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
    const correctOrder = QuizInfo.questions[currentQuestionIndex].correctOrder;
    setSelectedAns([...selectedAns, answerOrder]);
    if (JSON.stringify(answerOrder) === JSON.stringify(correctOrder)) {
      setScore(score + 1);
      setShowModal(false);
      setShowCorrectFeedback(true);
      setShowIncorrectFeedback(false);
      if (nextQuestion < QuizInfo.questions.length) {
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
        if (nextQuestion < QuizInfo.questions.length) {
          setCurrentQuestionIndex(nextQuestion);
          setAnswerOrder(QuizInfo.questions[nextQuestion].answer);
          setShowCorrectFeedback(false);
          setShowIncorrectFeedback(false);
        } else {
          setShowScore(true);
        }
      }, 3000); // wait for 3 seconds before moving to the next question
    }
  };

  console.log(selectedAns);
  // reset quiz
  const resetQuiz = () => {
    setSelectedAns([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
    setTimeIsUp(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
  };
  const droppableId = `droppable-${currentQuestionIndex}`;
  const currentQuestion = QuizInfo.questions[currentQuestionIndex];

  const progress =
    ((currentQuestionIndex + 1) / QuizInfo.questions.length) * 100;
  const { name } = useParams();

  return (
    <div className="main_content">
      {showScore ? (
        <>
          <div className="quiz-title-wrap">
            <h3 className="current-quiz-name">{name}</h3>
            <div className="quiz-reset">
              <QuizScore
                score={score}
                timeLeft={timeLeft}
                length={QuizInfo.questions.length}
              />
              <button onClick={() => resetQuiz()} className="quiz-reset-btn">
                Nouvel essai
              </button>
            </div>
          </div>
          <QuizFeedBackREO
            questions={QuizInfo.questions}
            selectedAns={selectedAns}
          />
        </>
      ) : (
        <div className="timer-card-wrap ">
          <div className="multichoice-quiz-Card">
            <section className="muc-question-section">
              <h3 className="current-quiz-name">{name}</h3>

              <Timer timeLeft={timeLeft} />
              <Progress
                className="progressBar"
                percent={progress}
                status="active"
                strokeColor={{ from: "#25856B", to: "#25C4A4" }}
              />
            </section>
            <section className="answer-section">
              <h3 className="mb-5" id="Question">
                {QuizInfo.questions[currentQuestionIndex].questionText}
              </h3>
              {QuizInfo.questions[currentQuestionIndex]?.hasPhoto ? (
                <div className="quiz-photo-wrap">
                  <img
                    src={QuizInfo.questions[currentQuestionIndex].url}
                    alt={QuizInfo.questions[currentQuestionIndex].questionText}
                    className="quiz-photo-img"
                  />
                  
                </div>
              ) : null}
              {console.log(QuizInfo.questions[currentQuestionIndex])}
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
                              className="reo-answer"
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
                <button className="mt-4" id="quiz-dnd-next" onClick={onNextQuestion}>
                  Valider
                </button>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReorderSch;
