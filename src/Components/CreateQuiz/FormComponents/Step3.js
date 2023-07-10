import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table } from 'antd';

const Step3 = () => {
  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        }, dataIndex); // Pass dataIndex to handleSave

        console.log(`${dataIndex}: Value:`, values[dataIndex]);
        const arrayColumn = { column: dataIndex, value: values[dataIndex] };
        setMyArray(prevArray => [...prevArray, arrayColumn]);
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: 'Please fill the input.',
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'write here...',
      address: 'write here...',
    },
  ]);
  const [inputValueA, setInputValueA] = useState('');
  const [inputValueB, setInputValueB] = useState('');
  const handleInputAction = (e, inputName) => {
    const value = e.target.value;
    if (e.type === 'blur' || (e.type === 'keypress' && e.key === 'Enter')) {
      console.log(value); // Log the input value to the console on blur or Enter key press
    }
    if (inputName === 'A') {
      setInputValueA(value);
    } else if (inputName === 'B') {
      setInputValueB(value);
    }
  };
  const [count, setCount] = useState(2);
  const [myArray, setMyArray] = useState([]);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };


  const defaultColumns = [
    {
      title: (
        <Input
          placeholder="Column A"
          type="text"
          value={inputValueA}
          onChange={(e) => handleInputAction(e, 'A')}
          onKeyPress={(e) => handleInputAction(e, 'A')}
        />
      ),
      dataIndex: 'name',
      editable: true,
    },
    {
      title: (
        <Input
          placeholder="Column B"
          type="text"
          value={inputValueB}
          onChange={(e) => handleInputAction(e, 'B')}
          onKeyPress={(e) => handleInputAction(e, 'B')}
        />
      ),
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Button onClick={() => handleDelete(record.key)}>Delete</Button>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{ marginLeft: '10px' }}
            >
              Add a row
            </Button>
          </div>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count.toString(),
      name: 'write here...',
      address: 'write here...',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row, dataIndex) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: (row) => handleSave(row, col.dataIndex), // Pass dataIndex to handleSave
      }),
    };
  });

  useEffect(() => {
    console.log('My Array:', myArray);
  }, [myArray]);

  return (
    <div style={{ lineHeight: '0' }}>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Step3;
