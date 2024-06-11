import React, { useState, useEffect } from "react";
import api from "../../api";
import { TextField, Button, Typography } from "@mui/material";
import "../DailyMealPlan/DailyMealPlan.css";

const MealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [newMealPlan, setNewMealPlan] = useState({
    user_id: "",
    week_start_date: "",
    week_end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [showMealPlans, setShowMealPlans] = useState(false);

  useEffect(() => {
    async function fetchMealPlans() {
      setLoading(true);
      try {
        const response = await fetch(api("/meal-plans"));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMealPlans(data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      } finally {
        setLoading(false);
      }
    }

    if (showMealPlans) {
      fetchMealPlans();
    }
  }, [showMealPlans]);

  const handleAddMealPlan = async (e) => {
    e.preventDefault();

    if (
      !newMealPlan.user_id ||
      !newMealPlan.week_start_date ||
      !newMealPlan.week_end_date
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(api("/meal-plans"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMealPlan),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMealPlans([...mealPlans, data]);
      setNewMealPlan({
        user_id: "",
        week_start_date: "",
        week_end_date: "",
      });
    } catch (error) {
      console.error("Error adding meal plan:", error);
    }
  };

  const handleDeleteMealPlan = async (id) => {
    try {
      const response = await fetch(api(`/meal-plans/${id}`), {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setMealPlans(mealPlans.filter((plan) => plan.meal_plan_id !== id));
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  return (
    <div className="meal-plan-manager">
      <Typography variant="h4">Manage Meal Plans</Typography>
      <div className="add-meal-plan">
        <Typography variant="h5">Add New Meal Plan</Typography>
        <form onSubmit={handleAddMealPlan}>
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            value={newMealPlan.user_id}
            onChange={(e) =>
              setNewMealPlan({ ...newMealPlan, user_id: e.target.value })
            }
            required
          />
          <TextField
            label="Week Start Date"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newMealPlan.week_start_date}
            onChange={(e) =>
              setNewMealPlan({
                ...newMealPlan,
                week_start_date: e.target.value,
              })
            }
            required
          />
          <TextField
            label="Week End Date"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newMealPlan.week_end_date}
            onChange={(e) =>
              setNewMealPlan({ ...newMealPlan, week_end_date: e.target.value })
            }
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Add Meal Plan
          </Button>
        </form>
      </div>
      <div className="meal-plan-list">
        <Typography variant="h5">Meal Plan List</Typography>
        <Button
          variant="contained"
          onClick={() => setShowMealPlans(!showMealPlans)}
        >
          {showMealPlans ? "Hide Meal Plans" : "Show Meal Plans"}
        </Button>
        {showMealPlans && (
          <>
            {loading ? (
              <Typography>Loading meal plans...</Typography>
            ) : (
              <ul>
                {mealPlans.map((plan) => (
                  <li key={plan.meal_plan_id}>
                    <Typography variant="h6">
                      User ID: {plan.user_id}
                    </Typography>
                    <Typography>
                      Week Start Date: {plan.week_start_date}
                    </Typography>
                    <Typography>Week End Date: {plan.week_end_date}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteMealPlan(plan.meal_plan_id)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MealPlan;
