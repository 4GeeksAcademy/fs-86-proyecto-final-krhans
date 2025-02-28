import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/DailyProgress.css";

const DailyProgress = ({ routine, onDailyProgressUpdate }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!routine || !routine.workouts || routine.workouts.length === 0) {
      console.log("⚠️ No hay entrenamientos en routine");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    console.log("📆 Fecha de hoy:", today);
    console.log("🔍 Workouts en routine:", routine.workouts);

    let todayWorkout = null;

    routine.workouts.forEach((workout, index) => {
      if (workout.day === today) {
        console.log(`✅ Entrenamiento encontrado en workout #${index + 1}`);
        todayWorkout = workout;
      }
    });

    if (todayWorkout) {
      console.log("🏋️‍♂️ Workout de hoy:", todayWorkout);
      const percentCompleted = todayWorkout.percent_completed ?? 0;
      setProgress(percentCompleted);
      onDailyProgressUpdate(percentCompleted);
    } else {
      console.log("❌ No se encontró entrenamiento para HOY");
      setProgress(0);
    }
  }, [routine, onDailyProgressUpdate]);

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
      <p className="daily-progress-text">
        Training Completed: {Math.round(progress)}%
      </p>
    </div>
  );
};

export default DailyProgress;
