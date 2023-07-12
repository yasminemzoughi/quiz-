import React, { useState } from 'react';

const jomla = [
  { phrase: "Sécrètent un liquide diluant le sperme", answer: null , correctAnswer:"Glandes de Cowper"},
  { phrase: "Assurent le transit des spermatozoïdes", answer: null , correctAnswer: "Canaux déférents"},
  { phrase: "Secrètent un produit riche en enzymes", answer: null, correctAnswer:"Prostate" },
  { phrase: "Assurent l’évacuation des spermatozoïdes", answer: null, correctAnswer:"Urètre" },
  { phrase: "Assurent le transit et la maturation des spermatozoïdes", answer: null , correctAnswer:"Epididymes" },
  { phrase: "Assurent la production des spermatozoïdes", answer: null , correctAnswer:"Testicules"},
  { phrase: "Sécrètent un liquide nutritif riche en fructose", answer: null , correctAnswer:"Vésicules séminales"},
  { phrase: "Il permet le transfert du sperme dans les voies génitales de la femme", answer: null , correctAnswer:"Verge"},
];

const DnD = () => {
  const [answers, setAnswers] = useState(jomla.map((item, index) => ({ ...item, id: index })));
//extract array from correct answer
  const data = jomla.map(item => item.correctAnswer);
console.log("data", data)

// dragdrop logic
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
    } else{
      console.log('wrong! heres the correct one!', item.correctAnswer);

    }
  };

  return (
    <div style={{lineHeight:"2"}}>
      <div>
        {data.map((item, index) => (
          <span
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
            style={{
              display: 'inline-block',
              margin: '6px',
              userSelect: 'none',
              border: "2px solid black",
              borderRadius: "6px",
              padding: "0.5%",
              cursor:"grab",
              backgroundColor:"green",
              color:"white"
            }}
          >
            {item}
          </span>
        ))}
      </div>


<ul>
  {answers.map((item, index) => (
    <li
      key={index} // Use index as the key
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event, item)}
      style={{ justifyContent: "space-around", display: "flex" }}
    >
      * {item.phrase}
      <div
        className="drop"
        style={{
          marginLeft: "4px",
          marginBottom: "6px",
          borderRadius: "4px",
          width: "30%",
          backgroundColor: item.answer ? "#C2DEDC" : "whitesmoke",
          border: item.answer ? "none" : "1px dashed #999"
        }}
      >
        {item.answer || "Drop here"}
      </div>
    </li>
  ))}
</ul>
    </div>
  );
};

export default DnD;
