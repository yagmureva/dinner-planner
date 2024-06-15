import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import Calendar from "./components/CalendarPage/Calendar.jsx";
import DailyMealPlan from "./components/DailyMealPlan/DailyMealPlan.jsx";
import RecipeManager from "./components/Recipe/RecipeManager.jsx";
import GroceryListGenerator from "./components/GroceryListGenerator/GroceryListGenerator.jsx";
import RecipeSelector from "./components/Recipe/RecipeSelector.jsx";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/calendar/:day",
    element: <DailyMealPlan />,
  },

  {
    path: "/recipes",
    element: <RecipeManager />,
  },
  {
    path: "/grocery-list",
    element: <GroceryListGenerator />,
  },
  {
    path: "/calendar/:day/select-recipe",
    element: <RecipeSelector />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
