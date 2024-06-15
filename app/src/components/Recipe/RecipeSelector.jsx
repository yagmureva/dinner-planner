import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { Button, Typography } from "@mui/material";
import "./RecipeManager.css";

const RecipeSelector = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { day } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        const response = await fetch(api("/recipes"));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const handleSelectRecipe = async (recipeId) => {
    try {
      // Add your logic to associate the selected recipe with the selected day
      // For example, making a POST request to your backend
      console.log(`Recipe ${recipeId} selected for day ${day}`);
      navigate("/calendar");
    } catch (error) {
      console.error("Error selecting recipe:", error);
    }
  };

  return (
    <div className="recipe-manager">
      <Typography variant="h4">Select Recipe for Day {day}</Typography>
      {loading && <p>Loading...</p>}
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.recipe_id}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelectRecipe(recipe.recipe_id)}
                >
                  Select Recipe
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeSelector;
