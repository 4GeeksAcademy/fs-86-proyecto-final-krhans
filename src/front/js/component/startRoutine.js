import React from "react";

const StartRoutineButton = ({ onClick }) => {
  return (
    <button className="start-routine-button" onClick={onClick}>
      Start Routine
    </button>
  );
};

export default StartRoutineButton;
