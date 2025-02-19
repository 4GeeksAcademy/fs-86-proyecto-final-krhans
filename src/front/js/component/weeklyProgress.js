import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/WeeklyProgress.css"; 

const WeeklyProgress = () => {
  
  const weekProgress = [
    { day: "Monday", progress: 100 },
    { day: "Tuesday", progress: 80 },
    { day: "Wendsday", progress: 60 },
    { day: "Thuesday", progress: 90 },
    { day: "Friday", progress: 100 },
    { day: "Saturday", progress: 70 },
    { day: "Sunday", progress: 50 },
  ];

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