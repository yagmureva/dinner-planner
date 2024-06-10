import React, { useState, useEffect } from "react";
import api from "../../api";
import { TextField, Button, Typography } from "@mui/material";
import "./RecipeManager.css";

const RecipeManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    prep_time: "",
    cook_time: "",
    user_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);

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

    if (showRecipes) {
      fetchRecipes();
    }
  }, [showRecipes]);

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    if (
      !newRecipe.name ||
      !newRecipe.description ||
      !newRecipe.prep_time ||
      !newRecipe.cook_time ||
      !newRecipe.user_id
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(api("/recipes"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecipes([...recipes, data]);
      setNewRecipe({
        name: "",
        description: "",
        prep_time: "",
        cook_time: "",
        user_id: "",
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const response = await fetch(api(`/recipes/${id}`), {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="recipe-manager">
      <Typography variant="h4">Manage Recipes</Typography>
      <div className="add-recipe">
        <Typography variant="h5">Add New Recipe</Typography>
        <form onSubmit={handleAddRecipe}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newRecipe.name}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, name: e.target.value })
            }
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newRecipe.description}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, description: e.target.value })
            }
            required
          />
          <TextField
            label="Prep Time"
            variant="outlined"
            fullWidth
            value={newRecipe.prep_time}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, prep_time: e.target.value })
            }
            required
          />
          <TextField
            label="Cook Time"
            variant="outlined"
            fullWidth
            value={newRecipe.cook_time}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, cook_time: e.target.value })
            }
            required
          />
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            value={newRecipe.user_id}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, user_id: e.target.value })
            }
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Add Recipe
          </Button>
        </form>
      </div>
      <div className="recipe-list">
        <Typography variant="h5">Recipe List</Typography>
        <Button
          variant="contained"
          onClick={() => setShowRecipes(!showRecipes)}
        >
          {showRecipes ? "Hide Recipes" : "Show Recipes"}
        </Button>
        {showRecipes && (
          <>
            {loading ? (
              <Typography>Loading recipes...</Typography>
            ) : (
              <ul>
                {recipes.map((recipe) => (
                  <li key={recipe.recipe_id}>
                    <Typography variant="h6">{recipe.name}</Typography>
                    <Typography>{recipe.description}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteRecipe(recipe.recipe_id)}
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

export default RecipeManager;
