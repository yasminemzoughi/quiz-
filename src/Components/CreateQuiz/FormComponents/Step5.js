import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import "./Step.css";

const Step5 = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState([]);
  const [editedAnswerIndex, setEditedAnswerIndex] = useState(null);


  const handleFinishAnswer = () => {
    form.validateFields().then((values) => {
      const newAnswer = {
        text: values.answer,
      };
  
      if (editedAnswerIndex !== null) {
        // Update the existing answer
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[editedAnswerIndex] = newAnswer;
          return updatedAnswers;
        });
      } else {
        // Add a new answer
        setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
      }
  
      form.resetFields(["answer"]);
      setEditedAnswerIndex(null);
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
  const handleSaveAnswers = () => {
    const answerObjects = answers.map((answer, index) => ({
      answer: answer.text,
      index: index + 1,
    }));

    console.log(answerObjects);
  };

  return (
    <div style={{ lineHeight: "0" }}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
      <Form form={form} onFinish={handleFinishAnswer}>
        <Form.Item name="answer" label="item">
          <div style={{ display: "flex", marginBottom: "0" }}>
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
      </Form>
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
        <div
          className="question-element"
          style={{ padding: "1%" }}
        >
          <strong>corresponding num: {index + 1} </strong>
          {answer.text}
          {editedAnswerIndex === index && answer.text ? (
  // Show the input for editing the answer
  <Form form={form} onFinish={handleFinishAnswer}>
    <Form.Item name="answer" label="item">
      <div>
        <input
          type="text"
          placeholder="Edit the answer..."
          label="Correct answer"
          className="input-add"
          required
          style={{
            width: "80%",
            borderRadius: "6px",
            marginBottom: "0px",
          }}
        />
      </div>
    </Form.Item>
  
  </Form>
) : (
  // Show the edit button
  <Button onClick={() => setEditedAnswerIndex(index)}>edit</Button>
)}

          <Button
            onClick={() => handleDeleteAnswer(index)}
          >delete</Button>
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
      <Button style={{ margin: "1%" }} onClick={handleSaveAnswers}>
        Save
      </Button>
    </div>
  );
};

export default Step5;
