// import { Button, Table, Input } from 'antd';
// import React, { useState } from 'react';

// const NewNew = () => {
//   const [columns, setColumns] = useState([]);
//   const [dataSource, setDataSource] = useState([]);

//   const handleAdd = () => {
//     const newColumn = {
//       title: <Input placeholder="Column Name" />,
//       dataIndex: `column${columns.length}`,
//       key: `column${columns.length}`,
//     };

//     const newRecord = columns.reduce((record, column) => {
//       record[column.dataIndex] = 'write here...';
//       return record;
//     }, {});

//     setColumns([...columns, newColumn]);
//     setDataSource([...dataSource, newRecord]);
//   };

//   const handleSave = () => {
//     const tableData = dataSource.map((record) => {
//       const newRecord = { ...record };
//       Object.keys(newRecord).forEach((key) => {
//         if (newRecord[key] === 'write here...') {
//           newRecord[key] = '';
//         }
//       });
//       return newRecord;
//     });

//     console.log('Table Data:', tableData);
//   };

//   const handleInputChange = (value, dataIndex, record) => {
//     const updatedRecord = { ...record };
//     updatedRecord[dataIndex] = value;

//     const updatedDataSource = dataSource.map((r) => {
//       if (r.key === updatedRecord.key) {
//         return updatedRecord;
//       }
//       return r;
//     });

//     setDataSource(updatedDataSource);
//   };

//   return (
//     <div style={{ lineHeight: '0' }}>
//       <Button style={{ margin: '4px' }} onClick={handleSave}>
//         Save
//       </Button>
//       <Button style={{ margin: '4px' }} onClick={handleAdd}>
//         Add
//       </Button>
//       <Table
//         bordered
//         dataSource={dataSource}
//         columns={columns}
//         pagination={false}
//         components={{
//           body: {
//             cell: (props) => (
//               <InputCell {...props} handleInputChange={handleInputChange} dataSource={dataSource} />
//             ),
//           },
//         }}
//       />
//     </div>
//   );
// };

// const InputCell = ({ dataIndex, record, handleInputChange, dataSource, ...restProps }) => {
//   const handleChange = (e) => {
//     const { value } = e.target;
//     handleInputChange(value, dataIndex, record);
//   };

//   return <td {...restProps}>{<Input value={record[dataIndex]} onChange={handleChange} />}</td>;
// };

// export default NewNew;
