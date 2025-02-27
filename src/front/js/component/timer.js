import React from "react";

const Timer = ({ timeLeft, workout, currentIndex }) => {
  if (!workout || !workout.trainings || !workout.trainings[currentIndex]) {
    return null; 
  }

  const duration = workout.trainings[currentIndex]?.duration || 60;

  return (
    <div className="timer-container">
      <svg className="progress-circle" width="90" height="90">
        <circle className="background-circle" cx="45" cy="45" r="40" />
        <circle
          className="progress-ring"
          cx="45"
          cy="45"
          r="40"
          style={{
            strokeDasharray: 251,
            strokeDashoffset: (251-(timeLeft / duration) * 251),
           
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          transform="rotate(90 45 45)"
          className="timer-text"
        >
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </text>
      </svg>
    </div>
  );
};

export default Timer;
