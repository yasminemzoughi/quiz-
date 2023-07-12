import React from "react";
import "./QuizFeedBack.css";
import { CheckCircle, CheckCircleFill, XCircle, XCircleFill } from "react-bootstrap-icons";

const QuizFeedBack = ({questions , selectedAns}) => {
  // const selectedAns = [
  //   { answerText: "Paris", isCorrect: true },
  //   { answerText: "eefef", isCorrect: false },
  //   { answerText: "eefef", isCorrect: true },
  //   { answerText: "eefef", isCorrect: false },
  // ];
  // const questions = [
  //   {
  //     questionText: "What is the capital of France?",
  //     answerOptions: [
  //       { answerText: "New York", isCorrect: false },
  //       { answerText: "London", isCorrect: false },
  //       { answerText: "Paris", isCorrect: true },
  //       { answerText: "Dublin", isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: "Who is CEO of Tesla?",
  //     answerOptions: [
  //       { answerText: "Jeff Bezos", isCorrect: false },
  //       { answerText: "Elon Musk", isCorrect: true },
  //       { answerText: "Bill Gates", isCorrect: false },
  //       { answerText: "Tony Stark", isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: "The iPhone was created by which company?",
  //     answerOptions: [
  //       { answerText: "Apple", isCorrect: true },
  //       { answerText: "Intel", isCorrect: false },
  //       { answerText: "Amazon", isCorrect: false },
  //       { answerText: "Microsoft", isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: "How many Harry Potter books are there?",
  //     answerOptions: [
  //       { answerText: "1", isCorrect: false },
  //       { answerText: "4", isCorrect: false },
  //       { answerText: "6", isCorrect: false },
  //       { answerText: "7", isCorrect: true },
  //     ],
  //   },
  // ];
console.log(selectedAns)
  return (
    <div className="quiz-feedback">
      <div className="quiz-feed-card">
        {questions?.map((item, key) => {
          return (
            <div key={key} className="quiz-feed-box">
              <div className="quiz-feed-box-header">
                <div className="quiz-icon">
                  {selectedAns[key]?.isCorrect ? 
                    <CheckCircleFill className="quiz-icon quiz-true" />
                  : 
                    <XCircleFill className="quiz-icon quiz-wrong" />
                  }
                </div>
                <div className="quiz-feed-texts">
                  <span className="quiz-feed-count">Question {key + 1}</span>
                  <span className="quiz-feed-question">
                    {item?.questionText}
                  </span>
                </div>
              </div>
              <div className="quiz-checking-wrap">
                {selectedAns[key]?.isCorrect && selectedAns.length ? (
                  <span className="quiz-feed-answer-text quiz-true">
                    {" "}
                    <CheckCircle className="quiz-true"/>
                    {selectedAns[key]?.answerText}
                  </span>
                ) : (
                  <div className="quiz-check-wrong">

                    {selectedAns.length ? <>
                      <span className="quiz-feed-answer-text quiz-wrong">
                    <XCircle className="quiz-wrong"/>
                      {selectedAns[key]?.answerText}
                    </span>
                    <span className="quiz-feed-answer-text quiz-true">
                    <CheckCircle className="quiz-true"/>
                      {item?.answerOptions?.map((s) => {
                        return s?.isCorrect ? s.answerText : null;
                      })}
                    </span>
                    </> : 
                   
                    <span className="quiz-feed-answer-text quiz-true">
                    <CheckCircle className="quiz-true"/>
                      {item?.answerOptions?.map((s) => {
                        return s?.isCorrect ? s.answerText : null;
                      })}
                    </span> }
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizFeedBack;
