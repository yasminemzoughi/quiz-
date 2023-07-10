import { Form, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const Step1 = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const paragraphObject = {
        paragraph: values.textarea,
      };
      console.log('Input value:', paragraphObject);
    });
  };

  return (
    <div style={{ lineHeight: '0' }}>
      <h5>Entrez le paragraphe et mettez les mots que vous souhaitez remplacer dans « »</h5>
      <Form form={form}>
        <Form.Item label="TextArea" name="textarea">
          <TextArea style={{ width: '200%' }} rows={4} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Log Value
        </Button>
      </Form>
    </div>
  );
};

export default Step1;
