import React, { useEffect } from "react";

const FeedBack = ({
  isSelected,
  showCorrectFeedback,
  showIncorrectFeedback,
  setShowCorrectFeedback,
  setShowIncorrectFeedback,
  setShowNextButton,
}) => {
  useEffect(() => {
    if (showCorrectFeedback || showIncorrectFeedback) {
      // Show the feedback for 2 seconds
      const timerId = setTimeout(() => {
        setShowCorrectFeedback(false);
        setShowIncorrectFeedback(false);
        setShowNextButton(false); // Hide the "Next" button after showing the feedback
      }, 2000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [showCorrectFeedback, showIncorrectFeedback, setShowCorrectFeedback, setShowIncorrectFeedback, setShowNextButton]);

  return (
    <div className="feedback">
      {/* feedback */}
      <div className={isSelected ? "show-footer" : "hide-footer"}>
        {showCorrectFeedback && (
          <div id="Great-work" style={{ border: "4px solid green" }}>
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
          <div id="Almost-there" style={{ border: "4px solid pink" }}>
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
