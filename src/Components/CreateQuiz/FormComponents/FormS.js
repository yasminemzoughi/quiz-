import React, { useState } from 'react';
import { Button, Form, Steps, message, theme } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import NewQuizModal from '../NewQuizModal';
import FillForm from './FillForm';
import Step2 from './TrueFalseForm';
import TabForm from './TabForm';
import DnDForm from './DnDForm';
import PicForm from './PicForm';
import DnDPreview from './DnDPreview';
import FillPreview from './FillPreview';
import DragPicPreview from './DragPicPreview';
import NewNew from "./NewNew"

const FormS = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [answers, setAnswers]= useState([])
  const [showAnswers, setShowAnswers]= useState(false)
  // drag and drop phrase/definition
  const [tableData, setTableData] = useState([{key:uuidv4(), phrase: '', correctAnswer: '' , answer: null,}]);
// text area fill in the blanks 
const [paragraph, setParagraph]= useState("");
// drag drop pic
const [list, setList]= useState([]);
const [uploadedImage, setUploadedImage] = useState(null);


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
      title: 'Tableau correspondance',
      content: <TabForm />,
    },
    // {
    //   title: 'Tableau correspondance',
    //   content: <NewNew />,
    // },
    {
      title: 'fill in the blanks form',
      content: <FillForm
      setParagraph={setParagraph}
      />,      
    },
    {
      title: 'fill-in-blanks preview',
      content: <FillPreview 
      paragraph={paragraph}
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
      title: 'phrase/definition',
      content: <DnDForm
      tableData={tableData}
      setTableData={setTableData}
      
      
      />
    },
    {
      title: 'DnD preview',
      content: <DnDPreview
      tableData={tableData}
      
      />
    },
    {
      title: 'Pic Form',
      content: <PicForm
      setList={setList}
 setUploadedImage={setUploadedImage}
 uploadedImage={uploadedImage}

      
      />
    },
    {
      title: 'Drag Pic Preview',
      content: <DragPicPreview
      list={list}
      uploadedImage={uploadedImage}
      />

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

export default FormS;
