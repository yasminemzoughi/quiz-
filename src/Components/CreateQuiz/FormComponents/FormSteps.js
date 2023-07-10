import React, { useState } from 'react';
import { Button, Form, Steps, message, theme } from 'antd';
import NewQuizModal from '../NewQuizModal';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step from './Step';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const FormSteps = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers]= useState([])
  const [showAnswers, setShowAnswers]= useState(false)

  const next = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: '2%',
  };
  const steps = [
    {
      title: 'array creation',
      content: <Step0 />,
    },
    {
      title: 'Tableau correspondance',
      content: <Step3 />,
    },
    {
      title: 'fill in the blanks',
      content: <Step1 questions={questions}
      setQuestions={setQuestions} 
      answers={answers}
      setAnswers={setAnswers}  
      showAnswers={showAnswers}
      setShowAnswers={setShowAnswers}
      />,      
    },
    {
      title: 'true false',
      content: <Step2 prev={prev}
      answers={answers}
      setAnswers={setAnswers}
      
      showAnswers={showAnswers}
      setShowAnswers={setShowAnswers}
      />,
    },
   
    {
      title: 'dnd image',
      content: <Step4/>

    },
    {
      title: 'question/réponse',
      content: <Step5 />

    },

    {
      title: 'question/réponse',
      content: <Step questions={questions} setQuestions={setQuestions} answers={answers} setAnswers={setAnswers} />

    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div>
      <NewQuizModal>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={prev}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
        </div>
      </NewQuizModal>
    </div>
  );
};

export default FormSteps;
