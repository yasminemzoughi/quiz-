import { ArrowRepeat, EmojiAngry, StarFill } from "react-bootstrap-icons";
import "./QuizFeedBack.css";

const QuizScore = ({ score, timeLeft, length }) => {
  let feedback, url;

  if (score === length) {
    feedback = "Excellent job!";
    url =
      "😊";
  } else if (score >= length / 2) {
    feedback = "Not bad, but you can do better!";
    url =
      "🙃";
  } else if (timeLeft === 0) {
    feedback = "Time's up! Try again!";
    url = "⏳";
  } else {
    feedback = "Better luck next time!";
    url =
      "😔";
  }

  const realScore = Math.round((score / length) * 100);

  return (
    <div className="quiz-score-badge">
      <div className="quiz-score-wrap">
        <div className="quiz-badge-score">
          <span className="badge-score">{realScore}%</span>
        </div>
        <div className="quiz-badge-emoji"> <span className="badge-emoji">{url}</span> </div>
        <div className="quiz-badge-reset">
            {" "}
            <StarFill className="badge-reset"/>
        </div>
      </div>
    </div>
  );
};

export default QuizScore;
