import { Col, Row, Slider } from "antd";
import { useState } from "react";
import Table from "react-bootstrap/Table";

const Step0 = () => {
  const [colCountKey, setColCountKey] = useState(2);
  const [rowCount, setRowCount] = useState(1);
  const colCounts = { 0: 2, 1: 3, 2: 4 };
  const cols = [];
  const colCount = colCounts[colCountKey];
  let colCode = "";

  const handleInputChange = (event, rowIndex, colIndex) => {
    const { value } = event.target;
    console.log(`Input value at row ${rowIndex}, col ${colIndex}:`, value);
  };

  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col
        key={i.toString()}
        span={24 / colCount}
        style={{
          width: "100%",
          height: "5vh",
        }}
      >
        <input
          placeholder="element"
          style={{
            textAlign: "center",
            borderRadius: "6px",
          }}
          onBlur={(event) => handleInputChange(event, 0, i)} // Assuming the inputs are in the first row
        />
      </Col>
    );
    colCode += `  <Col span={${4 / colCount}} />\n`;
  }

  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(
      <tr key={i}>
        {cols.map((col, index) => (
          <td key={index}>
            <input
              placeholder="element"
              style={{
                textAlign: "center",
                borderRadius: "6px",
              }}
              onBlur={(event) => handleInputChange(event, i + 1, index)}
            />
          </td>
        ))}
      </tr>
    );
  }

  return (
    <div style={{ lineHeight: "12px" }}>
      <div>Column Count:</div>
      <div style={{ width: "100%" }}>
        <Slider
          min={0}
          max={Object.keys(colCounts).length - 1}
          value={colCountKey}
          onChange={setColCountKey}
          marks={colCounts}
          step={null}
          tooltip={{
            formatter: (value) => colCounts[value],
          }}
        />
      </div>
      <div>Row Count:</div>
      <div style={{ width: "100%" }}>
        <Slider
          min={1}
          max={5}
          value={rowCount}
          onChange={setRowCount}
          marks={{ 1: "1", 2: "2", 4: "4", 6: "6" }} // Update marks and range as needed
          step={null}
          tooltip={{
            formatter: (value) => `${value} row(s)`,
          }}
        />
      </div>
      <Row gutter={[0, 0]} style={{}}>
        <Col span={24}>
          <Table striped bordered hover>
            <thead
              style={{
                backgroundColor: "aliceblue",
                width: "100%",
                justifyItems: "center",
              }}
            >
              <tr  style={{  textAlign: "center",  }}>
                {cols.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Step0;
