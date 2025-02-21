import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/DailyProgress.css"; 

const DailyProgress = ({ routine, onDailyProgressUpdate }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!routine || !routine.workouts) return;

    const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
    let totalTrainings = 0;
    let completedTrainings = 0;

    // Recorrer workouts y entrenamientos
    routine.workouts.forEach(workout => {
      workout.trainings.forEach(training => {
        totalTrainings++;
        if (training.is_complete && training.date_completed.startsWith(today)) {
          completedTrainings++;
        }
      });
    });

    const dailyProgress = totalTrainings > 0 ? (completedTrainings / totalTrainings) * 100 : 0;
    setProgress(dailyProgress);
    onDailyProgressUpdate(dailyProgress); // Enviar el progreso a WeeklyProgress
  }, [routine]);

  return (
    <div className="daily-progress-container">
      <h3 className="daily-progress-heading">Daily Progress</h3>
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
      <p className="daily-progress-text">Training Completed: {Math.round(progress)}%</p>
    </div>
  );
};

export default DailyProgress;