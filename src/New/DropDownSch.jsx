import React, { useEffect, useState } from "react";
import { questions } from "../../../Components/Quiz/DropDown/Questions";
import { Card } from "react-bootstrap";
import "./DropDown.css";
import PopUp from "../../../Components/Quiz/DropDown/PopUp";
import Timer from "../../../Components/Quiz/Timer/Timer";
import FeedBack from "../../../Components/Quiz/DropDown/FeedBack";
import { Progress } from "antd";
import QuizFeedBack from "../QuizFeedBack/QuizFeedBack";
import QuizScore from "../QuizFeedBack/QuizScore";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const QuizInfo = {
  QuizTime: 120,
  questions: [
    {
      id: 1,
      questionText: "How many rings are on the Olympic flag?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8UaO8zvh5DjMIZ3C-jUQyIdtnCH9VUBvPRCZIbf60YQ&s",
      hasPhoto: false,
      answerOptions: [
        { answerText: "none", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "7", isCorrect: false },
        { answerText: "5", isCorrect: true },
      ],
    },
    {
      id: 2,
      questionText: "What are the main colors on the flag of Spain?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5hhYe2XdnY2fj4Ct3l4zfxpoaQA2IS9v7A&usqp=CAU",
      hasPhoto: true,
      answerOptions: [
        { answerText: "black and yellow", isCorrect: false },
        { answerText: "green and white", isCorrect: false },
        { answerText: "red and yellow", isCorrect: true },
      ],
    },
    {
      id: 3,
      questionText: "Which of these countries did NOT fight in WWII?",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
      hasPhoto: true,
      answerOptions: [
        { answerText: "finland", isCorrect: false },
        { answerText: "greece", isCorrect: false },
        { answerText: "ireland", isCorrect: true },
        { answerText: "italy", isCorrect: false },
      ],
    },
    {
      id: 4,
      questionText: "Which of these rivers flows past the most countries?",
      url: "data:image/jpeg;base64,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",
      hasPhoto: true,
      answerOptions: [
        { answerText: "amazon", isCorrect: false },
        { answerText: "euphrates", isCorrect: false },
        { answerText: "danube", isCorrect: true },
        { answerText: "mississippi", isCorrect: false },
      ],
    },
  ],
};

const DropDownSch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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
  const [selectedAns, setSelectedAns] = useState([]);
  const [Ans, setAns] = useState({questionText: "You Didnt Choose", isCorrect: false});

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
    if (e.target.value === null) {
      alert("a please")
    } else {
      const selectedAnswerText = e.target.value;
      console.log(selectedAnswerText)
      const selectedAnswer = currentQuestionData.answerOptions.find(
        (answer) => answer.answerText === selectedAnswerText
      );
  
      setAns(selectedAnswer); // Update the state
      setIsSelected(true);
    }
  };

  const currentQuestionData = QuizInfo.questions[currentQuestion];

  const handleNextQuestion = (e) => {
    e.preventDefault();
    // Check if the selected answer is correct and update the score
    if (Ans.isCorrect) {
      setScore(score + 1);
      setShowCorrectFeedback(true);
      setIsSelected(true);
      setSelectedAns([...selectedAns, Ans]);
    } else {
      // wrong answer
      setIsSelected(true);
      setSelectedAns([...selectedAns, Ans]);
      setTimeout(() => {
        setShowIncorrectFeedback(true);
      }, 1000);
    }

    // Rest of your code...

    // Move to the next question
    const nextQuestion = currentQuestion + 1;
    setTimeout(() => {
      if (nextQuestion < QuizInfo.questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsSelected(false);
        setAns(null);
        setShowNextButton(true); // Show the "Next" button again
      } else {
        setShowScore(true);
      }
    }, 1000); // wait for 2 seconds
  };

  // Reset quiz
  const resetQuiz = () => {
    setSelectedAns([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
    setTimeLeft(QuizInfo.QuizTime);
    setTimeIsUp(false);
    setIsSelected(false);
    setSelectedAnswers([]);
  };



  const progress = ((currentQuestion + 1) / questions.length) * 100;
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
              <h3 className="current-quiz-name">{name}</h3>

              <Timer timeLeft={timeLeft} />
              <Progress
                className="progressBar"
                percent={progress}
                status="active"
                strokeColor={{ from: "#25856B", to: "#25C4A4" }}
              />
            </section>

            <div className="answer-section">
              <h3 id="Question">
                {QuizInfo.questions[currentQuestion].questionText}
              </h3>
              {QuizInfo.questions[currentQuestion].hasPhoto ? (
                <div className="quiz-photo-wrap">
                  <img
                    src={currentQuestionData.url}
                    alt={currentQuestionData.questionText}
                    className="quiz-photo-img"
                  />
                  
                </div>
              ) : null}
              <form onSubmit={handleNextQuestion}>

              <select required   onChange={handleAnswerSelect} className="dod-quiz-select">
                <option value="" disabled selected>Select an answer</option>
                {currentQuestionData.answerOptions.map((answer, index) => (
                  <option key={index} value={answer.answerText}>
                    {answer.answerText}
                  </option>
                ))}
              </select>

              <button id="quiz-dnd-next" type="submit">
                Valider
              </button>

              </form>
            </div>

            {/* feedback */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownSch;
