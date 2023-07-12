import React, { useState } from 'react';

const DnDPreview = ({ tableData }) => {
  const [answers, setAnswers] = useState([]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, item) => {
    event.preventDefault();
    const droppedItem = JSON.parse(event.dataTransfer.getData('text/plain'));

    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) => {
        if (answer.id === item.id) {
          return { ...answer, answer: droppedItem };
        }
        return answer;
      });
      return updatedAnswers;
    });

    // Check if dropped answer is correct and log a message
    if (droppedItem === item.correctAnswer) {
      console.log('Correct answer dropped!');
    } else {
      console.log('Wrong! Here is the correct answer:', item.correctAnswer);
    }
  };

  React.useEffect(() => {
    const updatedAnswers = tableData.map((item, index) => ({
      ...item,
      id: index,
      answer: null,
    }));
    setAnswers(updatedAnswers);
  }, [tableData]);

  const correctAnswers = answers.map((item) => item.correctAnswer);

  if (tableData.length === 0) {
    return <h6>
      drag and drop preview:
      No items yet</h6>;
  }

  return (
    <div style={{ lineHeight: '2' }}>
      <div>
        <h6>Retrouvez pour chaque mot la définition qui lui correspond</h6>
        {correctAnswers.map((correctAnswer, index) => (
          <span
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, correctAnswer)}
            style={{
              display: 'inline-block',
              margin: '6px',
              userSelect: 'none',
              border: '2px solid black',
              borderRadius: '6px',
              padding: '1%',
              cursor: 'grab',
              backgroundColor: 'lightblue',
              color: 'black',
            }}
          >
            {correctAnswer}
          </span>
        ))}
      </div>

      <ul>
        {answers.map((item, index) => (
          <li
            key={index}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, item)}
            style={{ justifyContent: 'space-around', display: 'flex', color: 'black' }}
          >
            * {item.phrase}
            <div
              className="drop"
              style={{
                marginLeft: '4px',
                marginBottom: '6px',
                borderRadius: '4px',
                color: 'black',
                width: '30%',
                backgroundColor: item.answer ? '#C2DEDC' : 'whitesmoke',
                border: item.answer ? 'none' : '1px dashed #999',
              }}
            >
              {item.answer || 'Drop here'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DnDPreview;
