import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import "./TrueFalse.css";
import Timer from "../../../Components/Quiz/Timer/Timer";
import { Progress } from "antd";
import QuizScore from "../QuizFeedBack/QuizScore";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import QuizFeedBackTOF from "../QuizFeedBack/QuizFeedBackTOF";

const QuizInfo = {
    QuizTime: 190,
    questions: [
        {
          questionText: "React is a programming language?",
          url: "https://miro.medium.com/v2/resize:fit:0/1*y6C4nSvy2Woe0m7bWEn4BA.png",
          hasPhoto: true,
          isCorrect: false
        },
        {
          questionText: "React is used for building user interfaces?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: false,
          isCorrect: true
        },
        {
          questionText: "React was developed by Facebook?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          isCorrect: true
        },
        {
          questionText: "ocean is yellow?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          isCorrect: false
        },
        {
          questionText: "spiders are plans?",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN06DcbbRXFq3GRJPMAj8AR699EV-_sP6FoA&usqp=CAU",
          hasPhoto: true,
          isCorrect: false,
        }
    
      ]
}

const TrueFalseSch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [selectedAns, setSelectedAns] = useState([]);

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

  const handleAnswer = (isCorrect) => {
    setSelectedAns([...selectedAns , isCorrect])
    if (isCorrect === QuizInfo.questions[currentQuestion].isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QuizInfo.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setSelectedAns([])
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(QuizInfo?.QuizTime);
    setTimeIsUp(false);
  };
  const progress = ((currentQuestion ) / QuizInfo.questions.length) * 100;
  const {name} = useParams()

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
        <QuizFeedBackTOF questions={QuizInfo.questions} selectedAns={selectedAns} />
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
                {QuizInfo.questions[currentQuestion].questionText}
              </h3>
              {"url" in QuizInfo.questions[currentQuestion] ? (
                <div className="quiz-photo-wrap">
                  <img
                    src={QuizInfo.questions[currentQuestion].url}
                    alt={QuizInfo.questions[currentQuestion].questionText}
                    className="quiz-photo-img"
                  />
                  
                </div>
              ) : null}
                  <button
                    
                    onClick={() => handleAnswer(true)}
                    className="tof-option-cont"
                  >
                    <Container
                      
                      className="muc-option-card "
                      fluid
                    >
                      <p className="tof-option-text">
                        {" "}
                        True
                      </p>
                    </Container>
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="tof-option-cont"
                  >
                    <Container
                      
                      className="muc-option-card "
                      fluid
                    >
                      <p className="tof-option-text">
                        {" "}
                        False
                      </p>
                    </Container>
                  </button>
               

             
            </section>

          </div>
        </div>
      )}
    </div>
  );
};

export default TrueFalseSch;
