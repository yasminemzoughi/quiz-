import React from 'react';
import { Button, Form, Input, Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const DnDForm = ({ setTableData, tableData }) => {
  const [form] = Form.useForm();

  const handleAddRow = () => {
    const newData = {
      key: uuidv4(),
      phrase: '',
      correctAnswer: '',
      answer: null,
      
    };
    setTableData((prevData) => [...prevData, newData]);
  };

  const handleDeleteRow = (key) => {
    setTableData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedData = Object.values(values.tableData);
        console.log("updatedData", updatedData)
        setTableData(updatedData);
        console.log(tableData);
      })
      .catch((error) => {
        console.log('Form validation failed');
      });
  };

  const columns = [
    {
      title: 'phrase',
      dataIndex: 'phrase',
      key: 'phrase',
      render: (_, record) => (
        <Form.Item
          name={['tableData', record.key, 'phrase']}
          rules={[{ required: true, message: 'Please enter phrase' }]}
        >
          <Input placeholder='Enter phrase' />
        </Form.Item>
      ),
    },
    {
      title: 'corresponding correctAnswer',
      dataIndex: 'correctAnswer',
      key: 'correctAnswer',
      render: (_, record) => (
        <Form.Item
          name={['tableData', record.key, 'correctAnswer']}
          rules={[{ required: true, message: 'Please enter corresponding correctAnswer' }]}
        >
          <Input placeholder='Enter corresponding correctAnswer' />
        </Form.Item>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {tableData.length > 1 && (
            <Button onClick={() => handleDeleteRow(record.key)}>Delete</Button>
          )}
          <Button onClick={handleAddRow}>Add Row</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ lineHeight: '0' }}>
      <Form form={form} onFinish={handleSave}>
        {console.log("tableData", tableData)}
        <Table
          columns={columns}
          bordered
          pagination={false}
          dataSource={tableData}
          rowKey="name"
        />
        <Button style={{margin:"6px"}} htmlType='submit'>Save</Button>
      </Form>
    </div>
  );
};

export default DnDForm;
