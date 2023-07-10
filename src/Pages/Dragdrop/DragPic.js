import React, { useState } from 'react';
import dragpic1 from "./Pics/dragpic 1.jpg";
import { Card } from 'react-bootstrap';

const DragPic = () => {
  const list = [
    { terme: 'Prostate', correspondant: 2 },
    { terme: 'Urètre', correspondant: 4 },
    { terme: 'Vésicules séminales', correspondant: 7 },
    { terme: 'Testicules', correspondant: 5 },
    { terme: 'Canaux déférents', correspondant: 1 },
    { terme: 'Vessie', correspondant: 6 },
    { terme: 'Glandes de Cowper', correspondant: 8 },
    { terme: 'Epididymes', correspondant: 9 },
    { terme: 'Pénis', correspondant: 3 },
  ];

  const termeArray = list.map(item => item.terme);
  const lengthOfArray = termeArray.length;

  const [draggedItem, setDraggedItem] = useState('');
  const [droppedItems, setDroppedItems] = useState(Array(lengthOfArray).fill(''));

  const handleDragStart = (event, term) => {
    setDraggedItem(term);
    event.dataTransfer.setData('text/plain', term);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const droppedTerm = draggedItem;
    const correspondingTerm = list.find(item => item.correspondant === index)?.terme;
  
    if (droppedTerm === correspondingTerm) {
      console.log(`Dropped: ${droppedTerm}, into div: ${index} (Correct)`);
    } else {
      console.log(`Dropped: ${droppedTerm}, into div: ${index} (Incorrect)`);
    }
    const updatedDroppedItems = [...droppedItems];
    updatedDroppedItems[index - 1] = draggedItem;
    setDroppedItems(updatedDroppedItems);
  };
  

  return (
    <div>
      <Card style={{ padding: "1%", margin: "2% auto" , width:"50%", backgroundColor:"aliceblue"}}>
        <h6 style={{color:"green", textAlign:"center"}}>Utilisez les termes suivants pour annoter le document</h6>
        <div className='d-flex'>
          <Card.Img style={{ width: "300px", justifyContent: "space-around" }} src={dragpic1} alt='pic' />

          <div className='terme' style={{ display: 'flex', flexDirection: 'column' }}>
            {termeArray.map((term, index) => (
              <div
                key={index}
                style={{ border: "2px dotted black", textAlign: "center", width: "120px", cursor: "move", margin: "10px" }}
                draggable
                onDragStart={(event) => handleDragStart(event, term)}
              >
                {term}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: lengthOfArray }, (_, index) => (
              <div
                key={index}
                style={{
                  border: "2px solid green",
                  padding: "2%",
                  textAlign: "center",
                  alignItems: "center",
                  width: "200px",
                  height: "6vh",
                  margin: "5px",
                
                  display: "flex",
                }}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index + 1, list[index].correspondant)}
              >
                <h5 style={{ color: "green", marginRight:"5px" }}>{index + 1})</h5>
                {droppedItems[index]}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DragPic;
