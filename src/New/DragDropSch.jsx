import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Dragdrop.css";
import {  Container } from "react-bootstrap";
import Timer from "../../../Components/Quiz/Timer/Timer";
import PopUp from "../../../Components/Quiz/DragDrop/PopUp";
import { ToastContainer, toast } from "react-toastify";
import MyModal from "../../../Components/Quiz/DragDrop/MyModal";
import FeedBack from "../../../Components/Quiz/DragDrop/FeedBack";
import { Progress } from "antd";
import CustomSubBtn from "../../../Components/SubjectLayout/CustomSubBtn";
 <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 55L8.3 56C16.7 57 33.3 59 50 57C66.7 55 83.3 49 100 53C116.7 57 133.3 71 150 77C166.7 83 183.3 81 200 78C216.7 75 233.3 71 250 70C266.7 69 283.3 71 300 66C316.7 61 333.3 49 350 44C366.7 39 383.3 41 400 49C416.7 57 433.3 71 450 78C466.7 85 483.3 85 500 83C516.7 81 533.3 77 550 73C566.7 69 583.3 65 600 66C616.7 67 633.3 73 650 72C666.7 71 683.3 63 700 62C716.7 61 733.3 67 750 67C766.7 67 783.3 61 800 61C816.7 61 833.3 67 850 70C866.7 73 883.3 73 891.7 73L900 73L900 0L891.7 0C883.3 0 866.7 0 850 0C833.3 0 816.7 0 800 0C783.3 0 766.7 0 750 0C733.3 0 716.7 0 700 0C683.3 0 666.7 0 650 0C633.3 0 616.7 0 600 0C583.3 0 566.7 0 550 0C533.3 0 516.7 0 500 0C483.3 0 466.7 0 450 0C433.3 0 416.7 0 400 0C383.3 0 366.7 0 350 0C333.3 0 316.7 0 300 0C283.3 0 266.7 0 250 0C233.3 0 216.7 0 200 0C183.3 0 166.7 0 150 0C133.3 0 116.7 0 100 0C83.3 0 66.7 0 50 0C33.3 0 16.7 0 8.3 0L0 0Z" fill="#25856b"></path><path d="M0 145L8.3 160C16.7 175 33.3 205 50 221C66.7 237 83.3 239 100 231C116.7 223 133.3 205 150 194C166.7 183 183.3 179 200 177C216.7 175 233.3 175 250 190C266.7 205 283.3 235 300 232C316.7 229 333.3 193 350 194C366.7 195 383.3 233 400 237C416.7 241 433.3 211 450 199C466.7 187 483.3 193 500 189C516.7 185 533.3 171 550 175C566.7 179 583.3 201 600 208C616.7 215 633.3 207 650 204C666.7 201 683.3 203 700 206C716.7 209 733.3 213 750 208C766.7 203 783.3 189 800 186C816.7 183 833.3 191 850 191C866.7 191 883.3 183 891.7 179L900 175L900 71L891.7 71C883.3 71 866.7 71 850 68C833.3 65 816.7 59 800 59C783.3 59 766.7 65 750 65C733.3 65 716.7 59 700 60C683.3 61 666.7 69 650 70C633.3 71 616.7 65 600 64C583.3 63 566.7 67 550 71C533.3 75 516.7 79 500 81C483.3 83 466.7 83 450 76C433.3 69 416.7 55 400 47C383.3 39 366.7 37 350 42C333.3 47 316.7 59 300 64C283.3 69 266.7 67 250 68C233.3 69 216.7 73 200 76C183.3 79 166.7 81 150 75C133.3 69 116.7 55 100 51C83.3 47 66.7 53 50 55C33.3 57 16.7 55 8.3 54L0 53Z" fill="#27a487"></path><path d="M0 193L8.3 217C16.7 241 33.3 289 50 311C66.7 333 83.3 329 100 320C116.7 311 133.3 297 150 287C166.7 277 183.3 271 200 271C216.7 271 233.3 277 250 296C266.7 315 283.3 347 300 335C316.7 323 333.3 267 350 256C366.7 245 383.3 279 400 286C416.7 293 433.3 273 450 270C466.7 267 483.3 281 500 275C516.7 269 533.3 243 550 242C566.7 241 583.3 265 600 268C616.7 271 633.3 253 650 258C666.7 263 683.3 291 700 299C716.7 307 733.3 295 750 288C766.7 281 783.3 279 800 276C816.7 273 833.3 269 850 258C866.7 247 883.3 229 891.7 220L900 211L900 173L891.7 177C883.3 181 866.7 189 850 189C833.3 189 816.7 181 800 184C783.3 187 766.7 201 750 206C733.3 211 716.7 207 700 204C683.3 201 666.7 199 650 202C633.3 205 616.7 213 600 206C583.3 199 566.7 177 550 173C533.3 169 516.7 183 500 187C483.3 191 466.7 185 450 197C433.3 209 416.7 239 400 235C383.3 231 366.7 193 350 192C333.3 191 316.7 227 300 230C283.3 233 266.7 203 250 188C233.3 173 216.7 173 200 175C183.3 177 166.7 181 150 192C133.3 203 116.7 221 100 229C83.3 237 66.7 235 50 219C33.3 203 16.7 173 8.3 158L0 143Z" fill="#25c4a4"></path><path d="M0 481L8.3 473C16.7 465 33.3 449 50 443C66.7 437 83.3 441 100 444C116.7 447 133.3 449 150 444C166.7 439 183.3 427 200 429C216.7 431 233.3 447 250 459C266.7 471 283.3 479 300 481C316.7 483 333.3 479 350 466C366.7 453 383.3 431 400 429C416.7 427 433.3 445 450 454C466.7 463 483.3 463 500 449C516.7 435 533.3 407 550 397C566.7 387 583.3 395 600 401C616.7 407 633.3 411 650 416C666.7 421 683.3 427 700 428C716.7 429 733.3 425 750 429C766.7 433 783.3 445 800 445C816.7 445 833.3 433 850 430C866.7 427 883.3 433 891.7 436L900 439L900 209L891.7 218C883.3 227 866.7 245 850 256C833.3 267 816.7 271 800 274C783.3 277 766.7 279 750 286C733.3 293 716.7 305 700 297C683.3 289 666.7 261 650 256C633.3 251 616.7 269 600 266C583.3 263 566.7 239 550 240C533.3 241 516.7 267 500 273C483.3 279 466.7 265 450 268C433.3 271 416.7 291 400 284C383.3 277 366.7 243 350 254C333.3 265 316.7 321 300 333C283.3 345 266.7 313 250 294C233.3 275 216.7 269 200 269C183.3 269 166.7 275 150 285C133.3 295 116.7 309 100 318C83.3 327 66.7 331 50 309C33.3 287 16.7 239 8.3 215L0 191Z" fill="#25c4a4"></path><path d="M0 541L8.3 528C16.7 515 33.3 489 50 478C66.7 467 83.3 471 100 481C116.7 491 133.3 507 150 511C166.7 515 183.3 507 200 506C216.7 505 233.3 511 250 517C266.7 523 283.3 529 300 532C316.7 535 333.3 535 350 528C366.7 521 383.3 507 400 507C416.7 507 433.3 521 450 523C466.7 525 483.3 515 500 503C516.7 491 533.3 477 550 475C566.7 473 583.3 483 600 489C616.7 495 633.3 497 650 497C666.7 497 683.3 495 700 491C716.7 487 733.3 481 750 488C766.7 495 783.3 515 800 514C816.7 513 833.3 491 850 490C866.7 489 883.3 509 891.7 519L900 529L900 437L891.7 434C883.3 431 866.7 425 850 428C833.3 431 816.7 443 800 443C783.3 443 766.7 431 750 427C733.3 423 716.7 427 700 426C683.3 425 666.7 419 650 414C633.3 409 616.7 405 600 399C583.3 393 566.7 385 550 395C533.3 405 516.7 433 500 447C483.3 461 466.7 461 450 452C433.3 443 416.7 425 400 427C383.3 429 366.7 451 350 464C333.3 477 316.7 481 300 479C283.3 477 266.7 469 250 457C233.3 445 216.7 429 200 427C183.3 425 166.7 437 150 442C133.3 447 116.7 445 100 442C83.3 439 66.7 435 50 441C33.3 447 16.7 463 8.3 471L0 479Z" fill="#27a487"></path><path d="M0 601L8.3 601C16.7 601 33.3 601 50 601C66.7 601 83.3 601 100 601C116.7 601 133.3 601 150 601C166.7 601 183.3 601 200 601C216.7 601 233.3 601 250 601C266.7 601 283.3 601 300 601C316.7 601 333.3 601 350 601C366.7 601 383.3 601 400 601C416.7 601 433.3 601 450 601C466.7 601 483.3 601 500 601C516.7 601 533.3 601 550 601C566.7 601 583.3 601 600 601C616.7 601 633.3 601 650 601C666.7 601 683.3 601 700 601C716.7 601 733.3 601 750 601C766.7 601 783.3 601 800 601C816.7 601 833.3 601 850 601C866.7 601 883.3 601 891.7 601L900 601L900 527L891.7 517C883.3 507 866.7 487 850 488C833.3 489 816.7 511 800 512C783.3 513 766.7 493 750 486C733.3 479 716.7 485 700 489C683.3 493 666.7 495 650 495C633.3 495 616.7 493 600 487C583.3 481 566.7 471 550 473C533.3 475 516.7 489 500 501C483.3 513 466.7 523 450 521C433.3 519 416.7 505 400 505C383.3 505 366.7 519 350 526C333.3 533 316.7 533 300 530C283.3 527 266.7 521 250 515C233.3 509 216.7 503 200 504C183.3 505 166.7 513 150 509C133.3 505 116.7 489 100 479C83.3 469 66.7 465 50 476C33.3 487 16.7 513 8.3 526L0 539Z" fill="#25856b"></path></svg>
const QuizInfo = {
  QuizTime: 450,
  QuizTitle: "Geography",
  ShowModal: true,
  questions: [
    {
      id: 1,
      question: " is the celestial body closest to the sun",
      answers: [
        { id: "answer1", text: "earth", isCorrect: true },
        { id: "answer2", text: "moon", isCorrect: false },
        { id: "answer3", text: "saturn", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: " is the capital city of Spain ",
      answers: [
        { id: "answer4", text: "Madrid", isCorrect: true },
        { id: "answer5", text: "Barcelona", isCorrect: false },
        { id: "answer6", text: "Seville", isCorrect: false },
      ],
    },
    {
      id: 3,
      question: " painted the Mona Lisa?",
      answers: [
        { id: "answer7", text: "Leonardo da Vinci", isCorrect: true },
        { id: "answer8", text: "Pablo Picasso", isCorrect: false },
        { id: "answer9", text: "Vincent van Gogh", isCorrect: false },
      ],
    },
    {
      id: 4,
      question: " painted the starry night?",
      answers: [
        { id: "answer7", text: "Leonardo da Vinci", isCorrect: true },
        { id: "answer8", text: "Pablo Picasso", isCorrect: false },
        { id: "answer9", text: "Vincent van Gogh", isCorrect: false },
      ],
    },
  ],
};

const DragDropSch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // score
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // modal for correct answer
  const [showModal, setShowModal] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  //feedback
  const [answerDropped, setAnsweDropped] = useState(false);
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);

  // timer
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState(null);
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
    //copy the questions
    const currentQuestionData = QuizInfo.questions[currentQuestion];
    const updatedAnswers = [...currentQuestionData.answers];
    //drag the answer
    const [draggedAnswer] = updatedAnswers.splice(source.index, 1);
    //put it back in the drop area
    updatedAnswers.splice(destination.index, 0, draggedAnswer);
    const updatedQuestionData = {
      ...currentQuestionData,
      answers: updatedAnswers,
    };
    const updatedQuestions = [...QuizInfo.questions];
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
      setShowModal(true);
      setCorrectAnswer(
        currentQuestionData.answers
          .filter((answer) => answer.isCorrect)
          .map((answer) => answer.text)
      );
    }

    setTimeout(() => {
      setShowModal(false);
      if (currentQuestion + 1 < QuizInfo.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setShowCorrectFeedback(false);
        setShowIncorrectFeedback(false);
      } else {
        setShowScore(true);
      }

      setSelectedAnswer(null);
    }, 2000);
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
  const currentQuestionData = QuizInfo.questions[currentQuestion];

  const questionParts = currentQuestionData.question.includes("____")
    ? currentQuestionData.question.split("____")
    : [currentQuestionData.question];
  const progress = ((currentQuestion + 1) / QuizInfo.questions.length) * 100;
console.log(selectedAnswer)
  return (
    <div className="quiz-content">
      {showScore ? (
        <PopUp
          score={score}
          timeLeft={timeLeft}
          timeIsUp={timeIsUp}
          reset={resetQuiz}
        />
      ) : (
        <div className="quiz-wrapper-dnd">
          <div className="current-quiz-title-wrap">
            <div className="current-quiz-title">Fill in the blanks</div>
          </div>
          <Timer timeLeft={timeLeft} />
          <span>
            <b>
              {" "}
              Question {currentQuestion + 1}/{QuizInfo.questions.length}{" "}
            </b>
          </span>

          <div className="quiz-DND-card">
            <Progress
              className="quiz-progressBar"
              percent={progress}
              status="active"
              strokeColor={{ from: "#006B4E", to: "#25C4A4" }}
            />
            <div className="quiz-card-body-dnd">
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="dnd-quiz-droparea">
                  <div className="drop-area-wrap">
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
                  {questionParts.map((part, index) => (
                    <div className="quiz-quest-text" key={index}>
                      {part}
                      {index === questionParts.length - 1 ? "" : "____"}
                    </div>
                  ))}

                </div>

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
                              onClick={() => setSelectedAnswer(answer)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="dnd-option-cont "
                              >
                                <Container className="dnd-option-card" fluid>
                                  <p className="dnd-option-text">{answer.text}</p>
                                </Container>
                              </div>
                              
                          
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div>
              <button id="quiz-dnd-next" onClick={handleNextQuestion}>
                Valider
              </button>
            </div>
            <FeedBack
              answerDropped={answerDropped}
              showCorrectFeedback={showCorrectFeedback}
              showIncorrectFeedback={showIncorrectFeedback}
            />
          </div>
          {/* Modal with the correct order */}
          {QuizInfo.ShowModal ? (
            <MyModal
              showModal={showModal}
              correctAnswer={correctAnswer}
              handleClose={handleClose}
            />
          ) : null}
        </div>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default DragDropSch;
