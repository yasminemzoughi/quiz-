import React from "react";

const FeedBack = ({ answerDropped, showCorrectFeedback, showIncorrectFeedback }) => {
  return (
    <div>
      {/* feedback */}
      <div className={answerDropped ? "show-footer" : "hide-footer"}>
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
