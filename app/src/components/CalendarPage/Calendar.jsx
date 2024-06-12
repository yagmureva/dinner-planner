import React, { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const [mealPlans, setMealPlans] = useState({}); // Günlere ait yemek planlarını tutmak için bir state

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const handleDateClick = (day) => {
    const meal = prompt("Enter your meal plan for the day:");
    if (meal) {
      setMealPlans((prevMealPlans) => ({
        ...prevMealPlans,
        [day]: meal,
      }));
    }
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
          <div>{i}</div>
          <div>{mealPlans[i]}</div> {/* Günün yemek planını göster */}
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
