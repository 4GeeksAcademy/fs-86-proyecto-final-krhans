import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/WeeklyProgress.css";

const WeeklyProgress = ({ routine }) => {
  const [weekProgress, setWeekProgress] = useState([]);

  useEffect(() => {
    if (!routine || !routine.workouts) return;

    const today = new Date();
    
    const currentWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        name: date.toLocaleString("en-US", { weekday: "long" }),
        date: date.getDate(),
        fullDate: date,
      };
    });

    let weeklyData = currentWeek.map(day => ({ day: day.name, progress: 0 }));

    routine.workouts.forEach(workout => {
      const completedDate = new Date(workout.day);
      const dayName = completedDate.toLocaleString("en-US", { weekday: "long" });

      const dayEntry = weeklyData.find(entry => entry.day === dayName);
      if (dayEntry) {
        const percentCompleted = workout.percent_completed || 0;
        dayEntry.progress += percentCompleted;  // Sumar el progreso de ese workout
      }
    });

    setWeekProgress(weeklyData);
  }, [routine]);

  return (
    <div className="weekly-progress-container">
      <h3 className="weekly-progress-heading">Weekly Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weekProgress}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="progress" fill="#6a5acd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyProgress;
