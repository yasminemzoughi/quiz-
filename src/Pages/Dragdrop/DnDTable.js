import React, { useState } from "react";
import { Button, Table } from "antd";

const DnDTable = () => {
  const list = [
    "Spermatogenèse",
    "Cellule de Sertoli",
    "Cellule germinale",
    "Hormonogenèse",
    "Cellule de Leydig",
    "Riche en vaisseaux sanguins",
  ];

  const [columnA, setColumnA] = useState([]);
  const [columnB, setColumnB] = useState([]);
  const [data, setData] = useState({
    key: "row",
    columnA: null,
    columnB: null,
  });

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDropColumnA = (event) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");
    if (!columnA.includes(item)) {
      setColumnA([...columnA, item]);
      setData((prevData) => ({
        ...prevData,
        columnA: <div key={item}>{item}</div>,
      }));
    }
  };

  const handleDropColumnB = (event) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");
    if (!columnB.includes(item)) {
      setColumnB([...columnB, item]);
      setData((prevData) => ({
        ...prevData,
        columnB: <div key={item}>{item}</div>,
      }));
    }
  };

  const handleDeleteColumnA = (item) => {
    setColumnA(columnA.filter((el) => el !== item));
    setData((prevData) => ({
      ...prevData,
      columnA: null,
    }));
  };

  const handleDeleteColumnB = (item) => {
    setColumnB(columnB.filter((el) => el !== item));
    setData((prevData) => ({
      ...prevData,
      columnB: null,
    }));
  };

  const columns = [
    {
      title: "Column A",
      dataIndex: "columnA",
      key: "columnA",
      render: () => (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDropColumnA}
          style={{
            padding: "8px",
            border: "1px solid lightgray",
            marginBottom: "4px",
          }}
        >
          {columnA.map((item) => (
            <div
              style={{
                border: "1px solid black",
                margin: "4px",
                padding: "2%",
                borderRadius: "6px",
                textAlign: "center",
              }}
              key={item}
            >
              {item}
              <i
                className="bi bi-trash"
                style={{ marginLeft: "6px", cursor: "pointer" }}
                onClick={() => handleDeleteColumnA(item)}
              ></i>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Column B",
      dataIndex: "columnB",
      key: "columnB",
      render: () => (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDropColumnB}
          style={{
            padding: "8px",
            border: "1px solid lightgray",
            marginBottom: "4px",
          }}
        >
          {columnB.map((item) => (
            <div
              style={{
                border: "1px solid black",
                margin: "4px",
                padding: "2%",
                borderRadius: "6px",
                textAlign: "center",
              }}
              key={item}
            >
              {item}
              <i
                className="bi bi-trash"
                style={{ marginLeft: "6px", cursor: "pointer" }}
                onClick={() => handleDeleteColumnB(item)}
              ></i>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        lineHeight: "0",
        backgroundColor: "aliceblue",
        margin: "5% 10%",
        padding: "2%",
      }}
    >
      <h5>
        <i>Retrouvez pour chaque mot la définition qui lui correspond</i>
      </h5>
      <h6 style={{ display: "flex" }}>
        {list.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              border: "2px solid black",
              margin: "6px ",
              cursor: "move",
              width: "25%",
              borderRadius: "6px",
              padding: "4px",
            }}
          >
            {item}
          </div>
        ))}
      </h6>
      <Table
        columns={columns}
        dataSource={[data]}
        pagination={false}
        bordered
      />
      <Button style={{ marginLeft: "40%", marginTop: "2%" }}>submit</Button>
    </div>
  );
};

export default DnDTable;
