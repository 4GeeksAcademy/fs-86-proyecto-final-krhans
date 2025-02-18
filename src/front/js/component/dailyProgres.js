import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/DailyProgress.css"; 

const DailyProgress = () => {
  
  const progress = 75; 

  return (
    <div className="daily-progress-container">
      <h3 className="daily-progress-heading">Progreso Diario</h3>
      <div className="daily-progress-circle">
        <CircularProgressbar
          value={progress}
          text={`${Math.round(progress)}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: progress === 100 ? "#32CD32" : "#6a5acd", 
            textColor: "#333",
            trailColor: "#ddd",
            backgroundColor: "#f3f3f3",
          })}
        />
      </div>
      <p className="daily-progress-text">Entrenamiento completado: {progress}%</p>
    </div>
  );
};

export default DailyProgress;