import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CalenderPage/Calender.css";

function CalendarDetails() {
  const { day } = useParams();
  const [meal, setMeal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/meal-plans", {
        day,
        meal,
      });
      alert("Meal saved successfully!");
    } catch (error) {
      console.error("There was an error saving the meal!", error);
    }
  };

  return (
    <div className="calendar-details">
      <h2>Plan your meal for {day}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal:
          <input
            type="text"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save Meal</button>
      </form>
    </div>
  );
}

export default CalendarDetails;
