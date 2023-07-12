import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./File.css";
import Xarrow from "react-xarrows";
import Timer from "../../../Components/Quiz/Timer/Timer";
import PopUp from "../../../Components/Quiz/Arrow/PopUp";
import { ToastContainer, toast } from "react-toastify";
import MyModal from "../../../Components/Quiz/Arrow/MyModal";
import FeedBack from "../../../Components/Quiz/Arrow/Feedback";

const QuizInfo = {
    QuizTime: 230,
    myData: [
        {
          question: {
            questionText: "Match the fruit with its proper color",
            id: "fruit",
            options: [
              { id: "fruit1", text: "banana", connectedColor: "color2" },
              { id: "fruit2", text: "apple", connectedColor: "color3" },
              { id: "fruit3", text: "berries", connectedColor: "color1" },
            ],
          },
          color: {
            id: "color",
            options: [
              { id: "color1", text: "red", isAvailable: true },
              { id: "color2", text: "yellow", isAvailable: true },
              { id: "color3", text: "green", isAvailable: true }  ,
            ],
          },
        },
        {
          question: {
            questionText: "Match the shape with its proper object",
            id: "shape",
            options: [
              { id: "shape1", text: "circle", connectedColor: "object2" },
              { id: "shape2", text: "square", connectedColor: "object3" },
              { id: "shape3", text: "triangle", connectedColor: "object1" },
            ],
          },
          color: {
            id: "object",
            options: [
              { id: "object1", text: "pyramid", isAvailable: true },
              { id: "object2", text: "wheel", isAvailable: true },
              { id: "object3", text: "dice", isAvailable: true },
            ],
          },
        },
        {
          question: {
            questionText: "Match the animal with its proper sound",
            id: "animal",
            options: [
              { id: "animal1", text: "lion", connectedColor: "sound3" },
              { id: "animal2", text: "cat", connectedColor: "sound1" },
              { id: "animal3", text: "dog", connectedColor: "sound2" },
            ],
          },
          color: {
            id: "sound",
            options: [
              { id: "sound1", text: "meow", isAvailable: true },
              { id: "sound2", text: "bark", isAvailable: true },
              { id: "sound3", text: "roar", isAvailable: true },
            ],
          },
        },
        {
          question: {
            questionText: "Match the countries with their capitals",
            id: "countries",
            options: [
              { id: "country1", text: "United States", connectedColor: "capital3" },
              { id: "country2", text: "France", connectedColor: "capital1" },
              { id: "country3", text: "Japan", connectedColor: "capital2" },
            ],
          },
          color: {
            id: "capital",
            options: [
              { id: "capital1", text: "Paris", isAvailable: true },
              { id: "capital2", text: "Tokyo", isAvailable: true },
              { id: "capital3", text: "Washington D.C.", isAvailable: true },
            ],
          },
        }
        
      ]
      
}

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

const ArrowSch = () => {
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
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
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
      const connectedItemAvailable = QuizInfo.myData[
        currentQuestionIndex
      ].color.options.find(
        (option) => option.id === connectedItemId
      ).isAvailable;

      if (connectedItemAvailable) {
        const connectedItem = QuizInfo.myData[currentQuestionIndex].color.options.find(
          (option) => option.id === connectedItemId
        );
        connectedItem.isAvailable = false;
        const newConnection = {
          start: selectedItemId,
          end: connectedItemId,
        };
        setConnections([...connections, newConnection]);

        // Check if the match is correct
        const selectedItem = QuizInfo.myData[currentQuestionIndex].question.options.find(
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
          const correctOption = QuizInfo.myData[currentQuestionIndex].color.options.find(
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
    const question = QuizInfo.myData[currentQuestionIndex].question.questionText;
    return <h3>{question}</h3>;
  };
  const handleNext = () => {
    // Check if there are any unconnected items
    const unconnectedItems = QuizInfo.myData[currentQuestionIndex].color.options.filter(
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
    if (currentQuestionIndex < QuizInfo.myData.length - 1) {
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
    QuizInfo.myData.forEach((question) => {
      question.color.options.forEach((option) => {
        option.isAvailable = true;
      });
    });
  };
  const progress = ((currentQuestionIndex + 1) / QuizInfo.myData.length) * 100;

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
          
          <Card className="Arrow-card">
          
            <div className="question-container">
              <h1>
                Question {currentQuestionIndex + 1}/{QuizInfo.myData.length}
              </h1>

              {renderQuestion()}
            </div>
            <div className="wrapping">
              <div className="circle-container-Colors">
                {QuizInfo.myData[currentQuestionIndex].color.options.map((option) => (
                  <DraggableBox
                    key={option.id}
                    box={option}
                    onClick={handleConnectedItemClick}
                    isSelected={selectedConnectedItemId === option.id}
                  />
                ))}
              </div>
              <div className="circle-container-fruit">
                {QuizInfo.myData[currentQuestionIndex].question.options.map((option) => (
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

export default ArrowSch;
