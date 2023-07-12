import React, { useState } from 'react';
import dragpic1 from "../../../Pages/Dragdrop/Pics/dragpic 1.jpg";
import { Card } from 'react-bootstrap';

const DragPicPreview = ({list,uploadedImage}) => {
console.log("list",list)

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
  
  const randomizedOrder = [...termeArray]; 

  for (let i = randomizedOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [randomizedOrder[i], randomizedOrder[j]] = [randomizedOrder[j], randomizedOrder[i]]; 
  }
  console.log("randomizedOrder",randomizedOrder);
  console.log("correctOrder",termeArray)
  return (
    <div>
      <Card style={{ backgroundColor:"aliceblue", lineHeight:"2", padding:"2%"}}>
        <h6 style={{color:"green", textAlign:"center"}}>Utilisez les termes suivants pour annoter le document</h6>
        <div className='d-flex'>
          {/* <Card.Img style={{ width: "40%", height:"50vh" }} src={dragpic1} alt='pic' /> */}
          <Card.Img
style={{ width: "50%", height:"50vh" }}
  src={uploadedImage ? URL.createObjectURL(uploadedImage) : 'default-image-path.jpg'}
  alt='Image'
/> 
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
                  color:"black"
                }}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index + 1, list[index].correspondant)}
              >
                <h5 style={{ color: "green", marginRight:"5px" }}>{index + 1})</h5>
                {droppedItems[index]}
              </div>
            ))}
          </div>
          <div className='terme' style={{ display: 'flex', flexDirection: 'column' }}>
            {randomizedOrder.map((term, index) => (
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
        </div>
        
      </Card>
    </div>
  );
}

export default DragPicPreview;
