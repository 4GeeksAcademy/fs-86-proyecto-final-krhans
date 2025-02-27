import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/WeeklyProgress.css"; 

const WeeklyProgress = ({ routine, dailyProgress }) => {
  const [weekProgress, setWeekProgress] = useState([]);

  useEffect(() => {
    if (!routine || !routine.workouts) return;

    const today = new Date();
    const todayName = today.toLocaleDateString("en-US", { weekday: "long" });
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let weeklyData = daysOfWeek.map(day => ({ day, progress: 0 }));

    routine.workouts.forEach(workout => {
      workout.completions.forEach(completion => {
        if (completion.completed && completion.date_completed) {
          let completedDate = new Date(completion.date_completed);
          let dayName = daysOfWeek[completedDate.getDay()];
          let dayEntry = weeklyData.find(entry => entry.day === dayName);
          if (dayEntry) {
            dayEntry.progress += 100 / routine.workouts.length;
          }
        }
      });
    });

    let todayEntry = weeklyData.find(entry => entry.day === todayName);
    if (todayEntry) {
      todayEntry.progress = dailyProgress;
    }

    setWeekProgress(weeklyData);
  }, [routine, dailyProgress]);

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