import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';

const FillPreview = ({ paragraph }) => {
  const [form] = Form.useForm();
  const [correctOrder, setCorrectOrder] = useState([]);

  const handleNext = () => {
    form.validateFields().then((values) => {
      console.log('Quiz answers:', values);
    });
  };

  useEffect(() => {
    const regex = new RegExp(/"([^"]*)"/g);
    const words = paragraph.match(regex);

    if (words) {
      setCorrectOrder(words.map((word) => word.replace(/"/g," ")));
    }
  }, [paragraph]);

  const renderParagraph = () => {
    const regex = new RegExp(/"([^"]*)"/g);
    const words = paragraph.match(regex);

    if (!words) return null;

    const inputFields = words.map((word, index) => {
      const inputName = `input_${index}`;
      return (
        <Form.Item
          name={inputName}
          key={inputName}
          rules={[
            { required: true, message: 'Please enter the answer' },
            () => ({
              validator(_, value) {
                if (value.toLowerCase() === word.replace(/"/g, '').toLowerCase()) {
                  return Promise.resolve();
                }
                return Promise.reject('Incorrect answer');
              },
            }),
          ]}
        >
          <Input placeholder="enter the correct word" />
        </Form.Item>
      );
      
    });

    const segments = paragraph.split(regex);

    return segments.map((segment, index) => {
      if (words.includes(`"${segment}"`)) {
        const wordIndex = words.indexOf(`"${segment}"`);
        return inputFields[wordIndex];
      }
      return segment;
    });
  };

  const randomizedOrder = [...correctOrder]; 

  for (let i = randomizedOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [randomizedOrder[i], randomizedOrder[j]] = [randomizedOrder[j], randomizedOrder[i]]; 
  }
  console.log("randomizedOrder",randomizedOrder);
  console.log("correctOrder",correctOrder)

  return (
    <div style={{ lineHeight: '0', marginBottom:"0" }}>
        <Card  >
            <h4>Complétez par les mots correspondants</h4>
      <h5 style={{backgroundColor:"aliceblue"}}>
        {randomizedOrder.join(' / ')}</h5>
      <Form form={form} style={{textAlign:"left"}}>
        {renderParagraph()}
      </Form>
      <Button type="primary" htmlType="submit" onClick={handleNext}>
        Next
      </Button>
      </Card>
    </div>
  );
};


export default FillPreview;
