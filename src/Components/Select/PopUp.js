import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { question } from './question';


const PopUp = (props) => {
  const { score, timeLeft } = props;
  let feedback, url;

  if (score === question.length) {
    feedback = "Excellent job!";
    url =
      "https://media0.giphy.com/media/62PP2yEIAZF6g/giphy.gif?cid=ecf05e47ar8yjtn6jr3xaz5l75eru3ihs3fnc4m5ew8r0yqo&rid=giphy.gif";
  } else if (score >= question.length / 2) {
    feedback = "Not bad, but you can do better!";
    url =
      "https://media0.giphy.com/media/1gqDQUaLe3mCc/giphy.gif?cid=ecf05e47f341pmrg5729x3oldfpekfomium1n2hgbf96pe2w&rid=giphy.gif";
  } else if (timeLeft === 0) {
    feedback = "Time's up! Try again!";
    url =
      "https://media.giphy.com/media/VEOPIjApsMIuwsAwJF/giphy.gif";
  } else {
    feedback = "Better luck next time!";
    url =
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZlNDFhMTlmY2YzMjFkNDM2Mjg0MWVlYjdmNzk2MDBjNGEzODI4NiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/H88IyldqT6hHCt3E4F/giphy.gif";
  }

  const realScore = Math.round((score / question.length) * 100);

  return (
    <div>
      <Card className="quiz-reorder-card" style={{margin: "2% auto"}}>
        <h2>You scored {realScore}%</h2>
        <h2>{feedback}</h2>
        <img className="quiz-reorder-gif" src={url} alt="gif" />
        <Button className="quiz-reorder-restart" onClick={() => props.reset()}>
          Try again
        </Button>
      </Card>
    </div>
  );
};


  

export default PopUp;
