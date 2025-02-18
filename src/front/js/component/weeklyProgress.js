import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/WeeklyProgress.css"; 

const WeeklyProgress = () => {
  
  const weekProgress = [
    { day: "Lunes", progress: 100 },
    { day: "Martes", progress: 80 },
    { day: "Miércoles", progress: 60 },
    { day: "Jueves", progress: 90 },
    { day: "Viernes", progress: 100 },
    { day: "Sábado", progress: 70 },
    { day: "Domingo", progress: 50 },
  ];

  return (
    <div className="weekly-progress-container">
      <h3 className="weekly-progress-heading">Progreso Semanal</h3>
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