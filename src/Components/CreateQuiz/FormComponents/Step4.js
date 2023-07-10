import { UploadOutlined } from '@ant-design/icons';
import {  Button, Input, InputNumber, Table } from 'antd';
const columns = [
    {
        title: 'corresponding inmage',
        dataIndex: 'image',
      },
  {
    title: 'item',
    dataIndex: 'name',
  },
  {
    title: 'corresponding number',
    dataIndex: 'age',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },

];
const data = [
  {
    key: '1',
    name:<div className='d-flex '> <Input placeholder='enter item'/>
  </div>,
    age: <InputNumber min={1}/>,
    image: <Button icon={<UploadOutlined />}>Click to Upload</Button>,
    operation: <div className='d-flex justify-content-around
    '>
 <Button>add</Button>
  <Button>delete</Button>
    </div>
 
  },
 
];
const App = () => (
  <>
    <Table columns={columns}
    bordered={true}
    pagination={false}
    
    dataSource={data} size="middle" />

  </>
);
export default App;