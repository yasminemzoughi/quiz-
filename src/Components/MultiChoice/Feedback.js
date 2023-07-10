import React, { useEffect } from "react";
import '../../Pages/Arrow/File.css'
const FeedBack = ({ answerConnected, showCorrectFeedback, showIncorrectFeedback , setShowCorrectFeedback, setShowIncorrectFeedback}) => {
  useEffect(() => {
    if (showCorrectFeedback || showIncorrectFeedback) {
      // Show the feedback for 2 seconds
      const timerId = setTimeout(() => {
        setShowCorrectFeedback(false);
        setShowIncorrectFeedback(false);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [showCorrectFeedback, showIncorrectFeedback]);

  return (
    <div className="feedback">
      {/* feedback */}
      <div className={answerConnected ? "show-footer" : "hide-footer"}>
        {showCorrectFeedback && (
          <div id="Great-work">
            <p>Great work!</p>
            <img
              width={"40px"}
              height={"40px"}
              src="https://app.studysmarter.de/assets/gifs/emotes/clapping_hands.gif"
              alt="correct"
            />
          </div>
        )}
        {showIncorrectFeedback && (
          <div id="Almost-there">
            <p>Almost there!</p>
            <img
              width={"40px"}
              height={"40px"}
              src="https://app.studysmarter.de/assets/gifs/emotes/eyes.gif"
              alt="incorrect"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedBack;
