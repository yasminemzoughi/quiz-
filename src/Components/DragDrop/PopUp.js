import React from "react";
import { Button, Card } from "react-bootstrap";
import { questions } from "./questions";

const PopUp = (props) => {
  const { score, timeLeft } = props;
  let feedback, url;

  if (score === questions.length) {
    feedback = "Excellent job!";
    url = "https://media.giphy.com/media/y4PQTcLTYJwOI/giphy.gif";
  } else if (score >= questions.length / 2) {
    feedback = "Not bad, but you can do better!";
    url =
      "https://media.giphy.com/media/jurcfxao8M3yzHmCjS/giphy.gif";
  } else if (timeLeft === 0) {
    feedback = "Time's up! Try again!";
    url = "https://media.giphy.com/media/VEOPIjApsMIuwsAwJF/giphy.gif";
  } else {
    feedback = "Better luck next time!";
    url = "https://media.giphy.com/media/oubM1tKqnLW5G/giphy.gif";
  }

  const realScore = Math.round((score / questions.length) * 100);

  return (
    <div>
      <Card className="quiz-dropdown-card">
        <h2>You scored {realScore}%</h2>
        <h2>{feedback}</h2>
        <img  style={{borderRadius:"6px"}} className="quiz-dropdown-gif" src={url} alt="gif" />
        <Button className="quiz-dragdrop-restart" onClick={() => props.reset()}>
          Try again
        </Button>
      </Card>
    </div>
  );
};

export default PopUp;
