import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./File.css";
import Xarrow from "react-xarrows";
import { myData } from "../../Components/Arrow/MyData";
import Timer from "../../Components/Timer/Timer";
import PopUp from "../../Components/Arrow/PopUp";
import { ToastContainer, toast } from "react-toastify";
import MyModal from "../../Components/Arrow/MyModal";
import FeedBack from "../../Components/Arrow/Feedback";

const boxStyle = {
  border: "1px solid",
  borderRadius: "10px",
  textAlign: "center",
  width: "100px",
  height: "30px",
  color: "black",
  alignItems: "center",
  display: "flex",
  margin: "20px",
  justifyContent: "center",
  cursor: "pointer",
};

const selectedBoxStyle = {
  ...boxStyle,
  backgroundColor: "lightgreen",
};

const DraggableBox = ({ box, onClick, isSelected }) => {
  const boxStyles = isSelected ? selectedBoxStyle : boxStyle;

  return (
    <div id={box.id} style={{ ...boxStyles }} onClick={() => onClick(box.id)}>
      {box.text}
    </div>
  );
};

const Arrow = () => {
  const [connections, setConnections] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedConnectedItemId, setSelectedConnectedItemId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // score
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // modal for correct answer
  const [modalShow, setModalShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  // timer
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeIsUp, setTimeIsUp] = useState(false);
  //feedback
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  const [answerConnected, setAnswerConnected] = useState(false);

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

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setSelectedConnectedItemId(null);
  };
  const handleConnectedItemClick = (connectedItemId) => {
    if (selectedItemId) {
      setSelectedConnectedItemId(connectedItemId);
      setAnswerConnected(true);
      const connectedItemAvailable = myData[
        currentQuestionIndex
      ].color.options.find(
        (option) => option.id === connectedItemId
      ).isAvailable;

      if (connectedItemAvailable) {
        const connectedItem = myData[currentQuestionIndex].color.options.find(
          (option) => option.id === connectedItemId
        );
        connectedItem.isAvailable = false;
        const newConnection = {
          start: selectedItemId,
          end: connectedItemId,
        };
        setConnections([...connections, newConnection]);

        // Check if the match is correct
        const selectedItem = myData[currentQuestionIndex].question.options.find(
          (option) => option.id === selectedItemId
        );

        if (selectedItem.connectedColor === connectedItemId) {
          // Correct match
          setScore(score + 1);
          setShowCorrectFeedback(true);
        } else {
          // Incorrect match
          setModalShow(true);
          setTimeout(() => {
            setShowIncorrectFeedback(true);
          }, 1000);
          // Find the correct answer based on the connected color
          const correctOption = myData[currentQuestionIndex].color.options.find(
            (option) => option.id === selectedItem.connectedColor
          );
          const correctAnswerText = selectedItem.text;
          const correctConnectedText = correctOption.text;
          setCorrectAnswer([correctAnswerText, correctConnectedText]);
        }
      }
    }
  };

  const renderConnections = () => {
    return connections.map((connection, index) => (
      <Xarrow
        key={index}
        start={connection.start}
        end={connection.end}
        color="blue"
        strokeWidth={2}
        animateDrawing={0.1}
        curveness={0}
      />
    ));
  };

  const renderQuestion = () => {
    const question = myData[currentQuestionIndex].question.questionText;
    return <h3>{question}</h3>;
  };
  const handleNext = () => {
    // Check if there are any unconnected items
    const unconnectedItems = myData[currentQuestionIndex].color.options.filter(
      (option) => option.isAvailable
    );

    if (unconnectedItems.length > 0) {
      // Show an alert to the user
      toast.error("Please connect all the elements!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Check if the previous answer was incorrect
    if (showIncorrectFeedback) {
      setModalShow(true);
      setTimeout(() => {
        setShowIncorrectFeedback(true);
        console.log("incorrect");
      }, 2000);
    }

    // Proceed to the next question
    if (currentQuestionIndex < myData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setConnections([]);
      setSelectedItemId(null);
      setSelectedConnectedItemId(null);
      setModalShow(false); // Hide the modal for correct answer
      setShowCorrectFeedback(false); // Hide the correct feedback
      setShowIncorrectFeedback(false); // Hide the incorrect feedback
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setTimeIsUp(false);
    setConnections([]);
    setSelectedItemId(null);
    setSelectedConnectedItemId(null);
    setShowCorrectFeedback(false);
    setShowIncorrectFeedback(false);

    // Reset availability of connected items
    myData.forEach((question) => {
      question.color.options.forEach((option) => {
        option.isAvailable = true;
      });
    });
  };

  return (
    <div>
      {showScore ? (
        <PopUp
          score={score}
          timeLeft={timeLeft}
          timeIsUp={timeIsUp}
          reset={resetQuiz}
        />
      ) : (
        <div className="timer-card-wrap">
          <Timer timeLeft={timeLeft} />
          <Card className="mycard">
            <div className="question-container">
              <h1>
                Question {currentQuestionIndex + 1}/{myData.length}
              </h1>
              {renderQuestion()}
            </div>
            <div className="wrapping">
              <div className="circle-container-Colors">
                {myData[currentQuestionIndex].color.options.map((option) => (
                  <DraggableBox
                    key={option.id}
                    box={option}
                    onClick={handleConnectedItemClick}
                    isSelected={selectedConnectedItemId === option.id}
                  />
                ))}
              </div>
              <div className="circle-container-fruit">
                {myData[currentQuestionIndex].question.options.map((option) => (
                  <DraggableBox
                    key={option.id}
                    box={option}
                    onClick={handleItemClick}
                    isSelected={selectedItemId === option.id}
                  />
                ))}
              </div>
            </div>
            {renderConnections()}
            <div className="buttons">
              <Button id="goTONext" onClick={handleNext}>
                Next
              </Button>
            </div>
          </Card>
          <FeedBack
          className="feedback"
            answerConnected={answerConnected}
            showCorrectFeedback={showCorrectFeedback}
            showIncorrectFeedback={showIncorrectFeedback}
            setShowCorrectFeedback={setShowCorrectFeedback}
            setShowIncorrectFeedback={setShowIncorrectFeedback}
          />
          <MyModal
            modalShow={modalShow}
            setModalShow={setModalShow}
            correctAnswer={correctAnswer}
          />
        </div>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default Arrow;
