import React, {useState} from "react";

const Calendar = ({ monthName, currentWeek, onDateClick }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClick = (day) => {
    setSelectedDay(day.date);
    onDateClick(day);
  };

  return (
      <div className="calendar">
          <h3>{monthName}</h3>
          <ul className="week-container">
              {currentWeek.map((day, index) => (
                  <li 
                    key={index} 
                    className={`day-circle ${selectedDay === day.date ? "selected" : ""}`} 
                    onClick={() => handleClick(day)}
                  >
                      {day.date}
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Calendar;
