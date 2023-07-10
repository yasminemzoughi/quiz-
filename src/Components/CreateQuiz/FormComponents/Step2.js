import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Switch } from "antd";
import "./Step.css";

const Step2 = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: true, correctAnswer: "" },
  ]); // Initial answer is marked as true

  const handleSwitchChange = (index, checked) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        isCorrect: checked,
      };
      if (!checked) {
        updatedAnswers[index].correctAnswer = ""; // Reset the correct answer for wrong answers
      }
      return updatedAnswers;
    });
  };

  const handleFinishAnswer = () => {
    form.validateFields().then((values) => {
      const newAnswer = {
        text: values.answer,
        isCorrect: true,
        correctAnswer: values[`correctAnswer-${answers.length}`] || "",
      };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
      form.resetFields(["answer", `correctAnswer-${answers.length}`]);
      console.log("newAnswer", newAnswer);
    });
  };

  const handleDeleteAnswer = (index) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.splice(index, 1);
      return updatedAnswers;
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedAnswers = Array.from(answers);
    const [reorderedItem] = updatedAnswers.splice(result.source.index, 1);
    updatedAnswers.splice(result.destination.index, 0, reorderedItem);

    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        correctAnswer: value,
      };
      return updatedAnswers;
    });
  };

  const handleAddAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { text: "", isCorrect: false, correctAnswer: "" },
    ]);
  };

  const handleSaveAnswers = () => {
    answers.forEach((answer, index) => {
      console.log("Answer:", answer.text, "isCorrect:", answer.isCorrect);
      if (!answer.isCorrect) {
        console.log("Correct Answer:", answer.correctAnswer);
      }
    });
  };

  return (
    <>
      <h5>true false</h5>
      <Form form={form} onFinish={handleFinishAnswer}>
        <div className="dragdrop">
          <div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="answers">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {answers.map((answer, index) => (
                      <Draggable
                        key={index}
                        draggableId={`answer-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="d-flex"
                          >
                            <div className="question-element">
                              <strong>Question {index + 1}: </strong>
                              <Form.Item
                                name={`answer-${index}`}
                                label="Sentence"
                                initialValue={answer.text}
                              >
                                <div
                                  style={{ display: "flex", marginBottom: "0" }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Add an answer..."
                                    label="Correct answer"
                                    className="input-add"
                                    style={{
                                      width: "80%",
                                      borderRadius: "6px",
                                      marginBottom: "0px",
                                    }}
                                  />
                                </div>
                              </Form.Item>
                              <Form.Item
                                label={answer.isCorrect ? "True" : "False"}
                                valuePropName="checked"
                              >
                                <Switch
                                  style={{ justifyContent: "center" }}
                                  checked={answer.isCorrect}
                                  onChange={(checked) =>
                                    handleSwitchChange(index, checked)
                                  }
                                />
                              </Form.Item>
                              {!answer.isCorrect && (
                                <Form.Item
                                  name={`correctAnswer-${index}`}
                                  label="Correct Answer"
                                >
                                  <input
                                    type="text"
                                    placeholder="Enter the correct answer"
                                    className="input-add"
                                    value={answer.correctAnswer || ""}
                                    onChange={(e) =>
                                      handleCorrectAnswerChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Item>
                              )}
                              <div>
                              <Button onClick={handleAddAnswer}>Add</Button>

                                <Button
                                  onClick={() => handleDeleteAnswer(index)}
                                >delete</Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <Button onClick={handleSaveAnswers}>Save</Button>
      </Form>
    </>
  );
};

export default Step2;
