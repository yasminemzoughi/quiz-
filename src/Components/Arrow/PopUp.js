import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../../Pages/Arrow/File.css'; 
import { myData } from './MyData';


const PopUp = (props) => {
  const { score, timeLeft } = props;
  let feedback, url;
  const realScore = Math.round(((score / myData.length) * 100)/ myData.length);

  if (realScore === 100) {
    feedback = "Excellent job!";
    url =
      "https://media.giphy.com/media/EbaEWv3icphQI/giphy.gif";
  } else if (score >= 50) {
    feedback = "Not bad, but you can do better!"; 
    url =
      "https://media.giphy.com/media/I9bpUrJcFdvpTPHzeW/giphy.gif";
  } else if (timeLeft === 0) {
    feedback = "Time's up! Try again!";
    url =
      "https://media.giphy.com/media/jN3arXHgwOQnF56JzE/giphy.gif";
  } else {
    feedback = "Better luck next time!";
    url =
      "https://media.giphy.com/media/CoND5j6Bn1QZUgm1xX/giphy.gif";
  }


  return (
    <div>
      <Card className="quiz-arrow">
        <h2>You scored {realScore}%</h2>
        <h2>{feedback}</h2>
        <img className="quiz-arrow-gif" src={url} alt="gif" />
        <Button className="quiz-arrow-restart" onClick={() => props.reset()}>
          Try again
        </Button>
      </Card>
    </div>
  );
};


  

export default PopUp;
