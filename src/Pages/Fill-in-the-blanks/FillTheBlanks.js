import React, { useEffect, useState } from "react";
import { questions } from "../../Components/Fill-in-the-blanks/Questions";
import { Card, Button, Modal } from "react-bootstrap";
import "./FillTheBlanks.css";
import PopUp from "../../Components/Fill-in-the-blanks/PopUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Timer from "../../Components/Timer/Timer";

const FillTheBlanks = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  //score
  const [score, setScore] = useState(0);
  //modal
  const [showScore, setShowScore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeIsUp, setTimeIsUp] = useState(false);

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
    setAnswer("");
  }, [currentQuestion]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuestion = currentQuestion + 1;
    const userAnswer = answer.trim().toLowerCase();
    const isCorrect =
      userAnswer === questions[currentQuestion].correctAnswer.toLowerCase();

    if (userAnswer === "") {
      toast.error("Please fill in the blanks !", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (isCorrect) {
      // Increase the score if the user's answer is correct
      setScore(score + 1);
      setShowModal(false);
    } else {
      //wrong answer ? show modal +wait 3sec
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000); // wait for 3 seconds before moving to next question
    }

    // Only move to the next question if the answer is not empty
    if (userAnswer !== "") {
      setTimeout(() => {
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
      }, 2000); // wait for 1 second before moving to next question
    }
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowScore(false);
    setTimeLeft(10);
  };

  return (
    <div className="main_content">
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
          <Card className="mycard" style={{ width: "25rem" }}>
            <div className="titel">
              <h2 id="todo">
                Please fill in the blanks with the correct word.
              </h2>
              <h1>
                Question {currentQuestion + 1}/{questions.length}
              </h1>
            </div>
            <div className="box">
              <form onSubmit={handleSubmit}>
                <div key={currentQuestion}>
                  <h4>{questions[currentQuestion].questionText}</h4>
                  <input
                    type="text"
                    name="answer"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                  />
                </div>
                <Button type="submit" id="Submit">
                  Submit
                </Button>
              </form>
            </div>
          </Card>
          <Modal
            className="correction"
            show={showModal}
            onHide={() => setShowModal(false)}
          >
            <Modal.Header>
              <Modal.Title>sorry, Here's Correct Answer ! </Modal.Title>
            </Modal.Header>
            <h3 id="corectAnswer">
              {questions[currentQuestion].correctAnswer.toLowerCase()}
            </h3>
            <Modal.Footer>
              <Button id="closebutton" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};
export default FillTheBlanks;