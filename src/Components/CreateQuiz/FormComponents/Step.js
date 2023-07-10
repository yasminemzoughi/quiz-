import React, { useState } from "react";
import {
  Form,
  Button,
  Checkbox,
  Switch,
  Upload,
  message,
  Collapse,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import "./Step.css";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Accordion } from "react-bootstrap";
const { Panel } = Collapse;

const Step = ({ questions, setQuestions, setAnswers, answers }) => {
  const [questionForm] = Form.useForm();
  const [answerForm] = Form.useForm();
  const [showUpload, setShowUpload] = useState(false);
  const [showAccording, setShowAccording] = useState(false);
  const [questionFilled, setQuestionFilled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filledAnswers, setFilledAnswers] = useState([]);

  const onFinish = (values) => {
    setQuestions((prevQuestions) => [...prevQuestions, values.question]);
    questionForm.resetFields();
    setQuestionFilled(true);
  };

  const handleAnswerSubmit = () => {
    answerForm.validateFields().then((values) => {
      setAnswers((prevAnswers) => [...prevAnswers, values.answer]);
      setFilledAnswers((prevFilledAnswers) => [...prevFilledAnswers, false]);
      answerForm.resetFields();
    });
  };
  

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.splice(index, 1);
      return updatedAnswers;
    });
  };

  const handleDeleteAnswer = (index) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.splice(index, 1);
      return updatedAnswers;
    });
  };

  const handleToggleUpload = (checked) => {
    setShowUpload(checked);
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
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="step1And2" style={{ lineHeight: "none" }}>
      <h3>ajouter les questions et réponses</h3>
      <div className="d-flex justify-content-around">
        <Form form={questionForm} onFinish={onFinish}>
          <div>
            <Form.Item
              name="question"
              label="Question"
              className="align-items-start"
              rules={[
                {
                  required: true,
                  message: "ajouter une question",
                },
              ]}
            >
              <input
                required
                type="text"
                placeholder="Ajouter une question..."
                className="input-add"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  marginRight: "20%",
                }}
                onChange={(e) =>
                  questionForm.setFieldsValue({ question: e.target.value })
                }
                disabled={questionFilled} // Disable the input once question is filled
              />
            </Form.Item>
          </div>

          {questions.length > 0 && !showAccording && (
            <div>
              {questions.map((question, index) => (
                <div key={index} className="d-flex  collapse">
                  <Panel
                    header={`Question ${index + 1}: ${question}`}
                    key={index}
                  />
                  
                  <EditOutlined
                    onClick={() => console.log("edit")}
                    style={{ margin: "4%" }}
                  />
                  <DeleteOutlined
                    onClick={() => handleDeleteQuestion(index)}
                    style={{ margin: "2%" }}
                  />
                </div>
              ))}
            </div>
          )}
        </Form>
        

        <Form form={answerForm} onFinish={handleAnswerSubmit}>
          <Form.Item
            name="answer"
            label="Réponse"
            className="align-items-start"
            rules={[
              {
                required: true,
                message: "ajouter une réponse",
              },
            ]}
          >
            <div className="d-flex">
              <input
                required
                type="text"
                placeholder="ajouter une réponse..."
                className="input-add"
                style={{ width: "80%", borderRadius: "6px" }}
              />
            </div>
          </Form.Item>
          {!showAccording && (
  <div className="dragdrop">
    <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="answers">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {answers.map((Answer, index) => (
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
                      className="answer-box"
                    >
                      <div className="question-element">
                        <strong>Réponse n{index + 1}: </strong>{" "}
                        {Answer}
                        <Checkbox
                          style={{ marginLeft: "50px" }}
                          checked={filledAnswers[index]}
                          onChange={() =>
                            setFilledAnswers((prevFilledAnswers) => {
                              const updatedFilledAnswers = [...prevFilledAnswers];
                              updatedFilledAnswers[index] = !filledAnswers[index];
                              return updatedFilledAnswers;
                            })
                          }
                        />
                      </div>
                      <div className="delete-edit-buttons d-flex align-items-center ">
                        <EditOutlined
                          onClick={() => console.log("edit")}
                          style={{ margin: "4xp" }}
                        />
                        <DeleteOutlined
                          onClick={() => handleDeleteAnswer(index)}
                          style={{ margin: "4px" }}
                        />
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
)}
  
        </Form>
      </div>
      <div className="switchUpload ">
        <Form.Item
          label="Ajouter des images"
          valuePropName="checked"
          id="switch-container"
        >
          <Switch onChange={handleToggleUpload} />
        </Form.Item>
        {showUpload && (
          <Form.Item
            style={{ textAlign: "start", margin: "2%" }}
            label="Télécharger des images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              onChange={(info) => {
                if (info.file.status === "done") {
                  message.success(`${info.file.name} uploaded successfully`);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} upload failed.`);
                }
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        )}
      </div>

      {/* according */}
      {showAccording && (
  <div
    className="according"
    style={{ maxHeight: "200px", overflowY: "scroll" }}
  >
    <Accordion defaultActiveKey="0">
      {questions.map((question, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header className="">
            <div>
              Question {index + 1}: {question}
            </div>
            <EditOutlined
              onClick={() => console.log("edit")}
              style={{ margin: "4%" }}
            />
            <DeleteOutlined
              onClick={() => handleDeleteQuestion(index)}
              style={{ margin: "2%" }}
            />
          </Accordion.Header>
          <Accordion.Body className="according-answer ">
            {answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <span>Answer {answerIndex + 1}: </span>
                {answer}
                <Checkbox
                  style={{ marginLeft: "50px" }}
                  checked={filledAnswers[answerIndex]}
                  onChange={() =>
                    setFilledAnswers((prevFilledAnswers) => {
                      const updatedFilledAnswers = [...prevFilledAnswers];
                      updatedFilledAnswers[answerIndex] = !filledAnswers[answerIndex];
                      return updatedFilledAnswers;
                    })
                  }
                />
              </div>
            ))}
            <EditOutlined onClick={() => console.log("edit")} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </div>
)}


      <div className="d-flex justify-content-center align-items-center">
        {!showAccording && (
          <Button
            type="primary"
            onClick={() => {
              setShowAccording(true);
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
          >
            Voir l'accordéon
          </Button>
        )}
        {showAccording && (
          <Button
            type="primary"
            onClick={() => {
              setShowAccording(false);
              setCurrentQuestionIndex(0);
            }}
          >
            Revenir
          </Button>
        )}
        
        <Form.Item style={{ marginLeft: "10px" }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleAnswerSubmit();
              setQuestionFilled(false);
            }}
          >
            Sauvegarder et Ajouter une autre réponse
          </Button>
        </Form.Item>
        
      </div>
      
    </div>
  );
};

export default Step;
