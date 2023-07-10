import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Dragdrop.css";
import { Card } from "react-bootstrap";
const questions = [
    {
      id: 1,
      question: " Sécrètent un liquide diluant le sperme",
      answers: [
        { id: "answer1", text: "Glandes de Cowper", isCorrect: true },
        { id: "answer2", text: "Canaux déférents", isCorrect: false },
        { id: "answer3", text: "Prostate", isCorrect: false },
        { id: "answer4", text: "Urètre", isCorrect: false },
        { id: "answer5", text: "Epididymes", isCorrect: false },
        { id: "answer6", text: "Testicules", isCorrect: false },
        { id: "answer7", text: "Vésicules séminales", isCorrect: false },
        { id: "answer8", text: "Verge", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: " Assurent le transit des spermatozoïdes ",
      answers: [
        { id: "answer1", text: "Glandes de Cowper", isCorrect: true },
        { id: "answer2", text: "Canaux déférents", isCorrect: false },
        { id: "answer3", text: "Prostate", isCorrect: false },
        { id: "answer4", text: "Urètre", isCorrect: false },
        { id: "answer5", text: "Epididymes", isCorrect: false },
        { id: "answer6", text: "Testicules", isCorrect: false },
        { id: "answer7", text: "Vésicules séminales", isCorrect: false },
        { id: "answer8", text: "Verge", isCorrect: false },
      ],
    },
    {
      id: 3,
      question: " Secrètent un produit riche en enzymes",
      answers: [
        { id: "answer1", text: "Glandes de Cowper", isCorrect: true },
        { id: "answer2", text: "Canaux déférents", isCorrect: false },
        { id: "answer3", text: "Prostate", isCorrect: false },
        { id: "answer4", text: "Urètre", isCorrect: false },
        { id: "answer5", text: "Epididymes", isCorrect: false },
        { id: "answer6", text: "Testicules", isCorrect: false },
        { id: "answer7", text: "Vésicules séminales", isCorrect: false },
        { id: "answer8", text: "Verge", isCorrect: false },
      ],
    },
    {
      id: 4,
      question: " Assurent l’évacuation des spermatozoïdes",
      answers: [
        { id: "answer1", text: "Glandes de Cowper", isCorrect: true },
        { id: "answer2", text: "Canaux déférents", isCorrect: false },
        { id: "answer3", text: "Prostate", isCorrect: false },
        { id: "answer4", text: "Urètre", isCorrect: false },
        { id: "answer5", text: "Epididymes", isCorrect: false },
        { id: "answer6", text: "Testicules", isCorrect: false },
        { id: "answer7", text: "Vésicules séminales", isCorrect: false },
        { id: "answer8", text: "Verge", isCorrect: false },
      ],
    },
  ];
const Try = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showQuestions, setShowQuestions] = useState(true);

  

  const handleDragEnd = (result, questionIndex) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedAnswers = [...questions[questionIndex].answers];
    const [draggedAnswer] = updatedAnswers.splice(source.index, 1);
    updatedAnswers.splice(destination.index, 0, draggedAnswer);
    const updatedQuestion = {
      ...questions[questionIndex],
      answers: updatedAnswers,
    };
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = updatedQuestion;
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = draggedAnswer;
      return updatedAnswers;
    });
  };

  if (!showQuestions) {
    return <div>No more questions.</div>;
  }

  return (
    <div className="">
      {questions.map((question, index) => (
        <div key={question.id} className="timer-card-wrap" style={{padding:"2%"}}>
          <Card className="mycard-DND">
              <DragDropContext onDragEnd={(result) => handleDragEnd(result, index)}>
                <Droppable droppableId={`answers-${question.id}`}>
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="draggable-choice"
                    >
                      {question.answers.map((answer, answerIndex) => (
                        <Draggable
                          key={answer.id}
                          draggableId={answer.id}
                          index={answerIndex}
                        >
                          {(provided) => (
                            <div
                              className="mylist"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {answer.text}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
                <div >
                <li>{question.question}</li>

                <div className="drop-area">
                  <Droppable droppableId={`drop-area-${question.id}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="drop-area"
                      >
                        {selectedAnswers[index] ? selectedAnswers[index].text : ""}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                </div>
              </DragDropContext>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Try;
