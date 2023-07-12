import { Form, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const FillForm = ({ setParagraph }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const updatedParagraph = values.textarea?.replace(/\n/g, ' ');
      setParagraph(updatedParagraph);
      console.log('Input value:', updatedParagraph);
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

export default FillForm;
