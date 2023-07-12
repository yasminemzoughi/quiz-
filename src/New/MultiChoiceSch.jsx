import React, { useEffect, useState } from "react";
import PopUp from "../../../Components/Quiz/MultiChoice/PopUp/PopUp";
import { Card, Container } from "react-bootstrap";
import "./MultiChoice.css";
import Timer from "../../../Components/Quiz/Timer/Timer";
import "../../../Components/Quiz/QuizLayout/QuizLayout.css";
import { Progress } from "antd";
import QuizFeedBack from "../QuizFeedBack/QuizFeedBack";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import QuizScore from "../QuizFeedBack/QuizScore";
import { ArrowRepeat } from "react-bootstrap-icons";

const QuizInfo = {
  QuizTime: 50,
  questions: [
    {
      questionText: "What is the capital of France?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
      hasPhoto: true,
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
      hasPhoto: true,
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
      hasPhoto: true,
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
      hasPhoto: true,
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ],
};

const MultiChoiceSch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //score
  const [score, setScore] = useState(0);

  const [showScore, setShowScore] = useState(false);
  const [selectedAns, setSelectedAns] = useState([]);
  //feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  const [answerClicked, setAnswerClicked] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [Ans, setAns] = useState({});

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

  const nextQuestion = currentQuestion + 1;
  const handleClick = () => {
    if (answerClicked) {
      if (Ans.isCorrect) {
        setScore(score + 1);
        setShowCorrectFeedback(true);
      } else {
        setShowIncorrectFeedback(true);
      }

      setSelectedAns([...selectedAns, Ans]);
      setAnswerClicked(false);
      setTimeout(() => {
        if (nextQuestion < QuizInfo.questions.length) {
          setShowCorrectFeedback(false);
          setShowIncorrectFeedback(false);
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
      }, 200); // wait for 3 seconds before moving to next question
    } else {
      alert("select ");
    }
  };
  const handleClicked = (item) => {
    setAnswerClicked(true);
    setAns(item);
  };
  //reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
    setTimeLeft(QuizInfo.QuizTime);
    setTimeIsUp(false);
    setAns([]);
    setSelectedAns([]);
  };
  const progress = (currentQuestion / QuizInfo.questions.length) * 100;
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
          <QuizFeedBack
            questions={QuizInfo.questions}
            selectedAns={selectedAns}
          />
        </>
      ) : (
        <div className="timer-card-wrap ">
          <div className="multichoice-quiz-Card">
            <section className="muc-question-section">
              <h3 id="Question">
                {QuizInfo.questions[currentQuestion].questionText}
              </h3>
              <Timer timeLeft={timeLeft} />
              <Progress
                className="progressBar"
                percent={progress}
                status="active"
                strokeColor={{ from: "#25856B", to: "#25C4A4" }}
              />
            </section>
            <section className="answer-section">
            {QuizInfo.questions[currentQuestion].hasPhoto ? (
                <div className="quiz-photo-wrap">
                  <img
                    src={QuizInfo.questions[currentQuestion].url}
                    alt={QuizInfo.questions[currentQuestion].questionText}
                    className="quiz-photo-img"
                  />
                  
                </div>
              ) : null}
              {QuizInfo.questions[currentQuestion].answerOptions.map(
                (item, index) => (
                  <button
                    key={item.answerText}
                    onClick={() => handleClicked(item)}
                    className={
                      Ans.answerText === item.answerText
                        ? "selected-option muc-option-cont"
                        : "muc-option-cont"
                    }
                  >
                    <Container
                      id={item.answerText}
                      className="muc-option-card "
                      fluid
                    >
                      <p className="muc-option-text">
                        {" "}
                        <span>{index + 1}</span> {item.answerText}
                      </p>
                    </Container>
                  </button>
                )
              )}

              <button id="quiz-dnd-next" onClick={() => handleClick()}>
                Valider
              </button>
            </section>
            {/* feedback */}
            <div className={answerClicked ? "show-footer" : "hide-footer"}>
              {showCorrectFeedback && (
                <div id="Great-work">
                  <p>Great work!</p>
                  <img
                    width={"40px"}
                    height={"40px"}
                    src="https://app.studysmarter.de/assets/gifs/emotes/clapping_hands.gif"
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
                    src="https://app.studysmarter.de/assets/gifs/emotes/eyes.gif"
                    alt="incorrect"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiChoiceSch;
