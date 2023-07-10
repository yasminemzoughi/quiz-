import React, { useState } from "react";
import { Card, Button, Form, Input } from "antd";
import "./TrueFalse.css";
import PopUp from "../../Components/TrueFalse/PopUp/PopUp";
import { questions } from "../../Components/TrueFalse/PopUp/Questions";

const TrueFalse = () => {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValues, setInputValues] = useState({});

  const handleAnswer = () => {
    let newScore = 0;
  
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
  
      if (userAnswer === question.answer) {
        newScore++;
        console.log(`Question ${question.id}: Answer is correct.`);
      } else if (
        userAnswer === false &&
        inputValues[question.id]?.toLowerCase() ===
          question.correctAnswer.toLowerCase()
      ) {
        console.log(question.correctAnswer.toLowerCase())
        newScore++;
        console.log(`Question ${question.id}: User input is correct.`);
      } else {
        console.log(`Question ${question.id}: Answer is incorrect.`);
      }
    });
  
    setScore(newScore);
    setShowScore(true);
  };
  

  const resetQuiz = () => {
    setShowScore(false);
    setScore(0);
    setAnswers({});
    setInputValues({});
  };

  const handleOptionChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleInputChange = (questionId, e) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [questionId]: e.target.value,
    }));
  };

  const isAllQuestionsAnswered =
    Object.keys(answers).length === questions.length;

  return (
    <div className="main_content">
      {showScore ? (
        <PopUp score={score} reset={resetQuiz} />
      ) : (
        <div className="timer-card-wrap">
          <Card className="quiz-truefalse-Card">
            <h2 style={{ color: "#529E89" }}>
              Répondre par vrai ou faux. Corrigez les propositions incorrectes.
            </h2>
            {questions.map((question) => (
              <div key={question.id} className="q-conatiner">
                  <h3>{question.question}</h3>
                <div className="buttons-input-container">
                  <Button
                    type={answers[question.id] === true ? "primary" : "default"}
                    onClick={() => handleOptionChange(question.id, true)}
                    style={{ marginRight: "10px" }}
                  >
                    True
                  </Button>
                  <Button
                    type={
                      answers[question.id] === false ? "primary" : "default"
                    }
                    onClick={() => handleOptionChange(question.id, false)}
                  >
                    False
                  </Button>

                  {answers[question.id] === false && (
                    <div className="input-field">
                      <Form.Item
                        type="text"
                        label="correct answer"
                        value={inputValues[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e)}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAllQuestionsAnswered && (
              <Button onClick={handleAnswer}>Submit</Button>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrueFalse;
