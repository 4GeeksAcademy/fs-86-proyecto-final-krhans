import React from "react";

const Calendar = ({ monthName, currentWeek }) => {
  return (
    <div className="calendar">
      <h3>{monthName}</h3>
      <ul className="week-container">
        {currentWeek.map((day, index) => (
          <li key={index} className="day-circle">
            <span>{day.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
