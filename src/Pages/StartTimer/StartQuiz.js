import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "./StartQuiz.css";

const StartQuiz = () => {
  return (
    <div>
      <Card className="start-quiz-card">
        <p> you have 20 seconds to finish the quiz</p>
        <button className="start-quiz-button">
          <FontAwesomeIcon
            icon={faClock}
            beat
            style={{ marginRight: "2%", marginTop: "2%" }}
          />
          <strong>
            <h6> start Timer</h6>
          </strong>
        </button>
      </Card>
    </div>
  );
};

export default StartQuiz;
