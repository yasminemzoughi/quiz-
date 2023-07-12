import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Select.css";
import PopUp from "../../../Components/Quiz/Select/PopUp";
import Timer from "../../../Components/Quiz/Timer/Timer";
import { ToastContainer, toast } from "react-toastify";
import MyModal from "../../../Components/Quiz/Select/MyModal";
import { Progress } from "antd";
import FeedBack from "../../../Components/Quiz/Select/FeedBack";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import QuizFeedBackTOF from "../QuizFeedBack/QuizFeedBackTOF";
import QuizScore from "../QuizFeedBack/QuizScore";
import QuizFeedBackMC from "../QuizFeedBack/QuizFeedBackMC";

const QuizInfo = {
    QuizTime: 260, 
    questions: [
        {
          questionText: "What is the largest country in the world by area?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          options: ["Russia", "China", "USA", "Canada"],
          answer: ["Russia", "Canada"], // Multiple correct answers
          selected: [],
        },
        {
          questionText: " Which of the following are prime numbers?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          options: ["2", "4", "7", "9", "11"],
          answer: ["2", "7", "11"],
          selected: [],
        },
        {
          questionText: "What is the capital of South Africa?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          options: ["Johannesburg", "Cape Town", "Pretoria", "Durban"],
          answer: ["Pretoria", "Cape Town"], // Multiple correct answers
          selected: [],
        },
        {
          questionText: "Which planet is known as the Red Planet?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          options: ["Mars", "Venus", "Jupiter", "Mercury"],
          answer: ["Mars"],
          selected: [],
        },
      ]
      
}


const SelectSch = () => {
  const [questionsState, setQuestionsState] = useState(QuizInfo.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //score
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  //feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
  const [timeIsUp, setTimeIsUp] = useState(false);
  //modal for correct answer
  const [showModal, setShowModal] = useState(false);
  const [selectedAns, setSelectedAns] = useState([]);
  const [sending, setSending] = useState(false);

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
    if (currentQuestion.selected.length < currentQuestion.answer.length) {
      toast.error(`Please select at least ${currentQuestion.answer.length} answers!`, {
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
        setSending(true)
        setSelectedAns([...selectedAns , selectedOptions ])
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
          setSending(false)
          setShowModal(false); // Close the modal when moving to the next question
        } else {
          setShowScore(true);
        }
      }, 3000); // wait for 3 seconds
    }
  };

  const resetQuiz = () => {
    setSending(false)
    setCurrentQuestionIndex(0);
    setSelectedAns([])
    setScore(0);
    setShowScore(false);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);
    setTimeLeft(QuizInfo.QuizTime);
    setTimeIsUp(false);
    setShowModal(false); // Close the modal when resetting the quiz
    const resetQuestions = questionsState.map((q) => ({
      ...q,
      selected: [],
    }));
    setQuestionsState(resetQuestions);
  };
  const progress = ((currentQuestionIndex ) / QuizInfo.questions.length) * 100;
  const {name} = useParams();

  return (
    <div className="main_content">
    {showScore ? (
      <>
       <div className="quiz-title-wrap">
      <h3 className="current-quiz-name">{name}</h3>
      <div className="quiz-reset">
      <QuizScore score={score} timeLeft={timeLeft} length={QuizInfo.questions.length} />
      <button onClick={() => resetQuiz()} className="quiz-reset-btn">
          Nouvel essai
      </button>
      </div>
      </div>
      <QuizFeedBackMC questions={QuizInfo.questions} selectedAns={selectedAns} /> 
   </> ) : (
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
              {QuizInfo.questions[currentQuestionIndex]?.questionText}
            </h3>
            {QuizInfo.questions[currentQuestionIndex].hasPhoto ? (
                <div className="quiz-photo-wrap">
                  <img
                    src={QuizInfo.questions[currentQuestionIndex].url}
                    alt={QuizInfo.questions[currentQuestionIndex].questionText}
                    className="quiz-photo-img"
                  />
                  
                </div>
              ) : null}
            {currentQuestion.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mulS-option-cont">
                  <label
                    className="d-flex align-items-center"
                    htmlFor={`option-${optionIndex}`}
                  >
                    <input
                      className="myinput m-1"
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
             

             <button disabled={sending} className="mt-5" id="quiz-dnd-next" onClick={() => handleClick()}>
                Valider
              </button>
           
          </section>

        </div>
      </div>
    )}
  </div>
);
};

export default SelectSch;
