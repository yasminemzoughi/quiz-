import React from "react";

const CustomSubBtn = ({ fc , title }) => {
  return (
    <div className="d-flex w-100 justify-content-start">
      <button onClick={fc} className="custom-sub-btn">
       {title}
      </button>
    </div>
  );
};

export default CustomSubBtn;
