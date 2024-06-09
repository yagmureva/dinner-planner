import React from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

function Calendar() {
  const navigate = useNavigate();
  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const handleDateClick = (day) => {
    navigate(`/calendar/${day}`);
  };

  const renderCalendar = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // months from 1-12
    const year = today.getFullYear();
    const days = daysInMonth(month, year);

    const daysArray = [];
    for (let i = 1; i <= days; i++) {
      daysArray.push(
        <div key={i} className="day" onClick={() => handleDateClick(i)}>
          {i}
        </div>
      );
    }

    return <div className="calendar-grid">{daysArray}</div>;
  };

  return (
    <div className="calendar">
      <h2>Interactive Calendar</h2>
      {renderCalendar()}
    </div>
  );
}

export default Calendar;
