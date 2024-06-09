import React, { useState, useEffect } from "react";
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
  const [editing, setEditing] = useState(null);
  const [showRecipes, setShowRecipes] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      console.log("Fetching recipes...");
      const response = await fetch("/api/nested/recipes");
      const data = await response.json();
      console.log("Fetched recipes:", data);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = async () => {
    const url = editing
      ? `/api/nested/recipes/${editing}`
      : "/api/nested/recipes";
    const method = editing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();

      if (editing) {
        setRecipes(
          recipes.map((recipe) =>
            recipe.recipe_id === editing ? data : recipe
          )
        );
      } else {
        setRecipes([...recipes, data]);
      }

      setNewRecipe({
        name: "",
        description: "",
        prep_time: "",
        cook_time: "",
        user_id: "",
      });
      setEditing(null);
    } catch (error) {
      console.error("Error adding/updating recipe:", error);
    }
  };

  const handleEditRecipe = (recipe) => {
    setNewRecipe(recipe);
    setEditing(recipe.recipe_id);
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await fetch(`/api/nested/recipes/${id}`, {
        method: "DELETE",
      });
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    if (showRecipes) {
      fetchRecipes();
    }
  }, [showRecipes]);

  return (
    <div className="recipe-manager">
      <h2>Manage Recipes</h2>
      <div className="add-recipe">
        <h3>{editing ? "Edit Recipe" : "Add New Recipe"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newRecipe.description}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, description: e.target.value })
          }
        ></textarea>
        <input
          type="text"
          placeholder="Prep Time"
          value={newRecipe.prep_time}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, prep_time: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cook Time"
          value={newRecipe.cook_time}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, cook_time: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="User ID"
          value={newRecipe.user_id}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, user_id: e.target.value })
          }
        />
        <button onClick={handleAddRecipe}>
          {editing ? "Update Recipe" : "Add Recipe"}
        </button>
      </div>
      <div className="recipe-list">
        <h3>Recipe List</h3>
        <button onClick={() => setShowRecipes(!showRecipes)}>
          {showRecipes ? "Hide Recipes" : "Show Recipes"}
        </button>
        {showRecipes && (
          <>
            {loading ? (
              <p>Loading recipes...</p>
            ) : (
              <ul>
                {recipes.map((recipe) => (
                  <li key={recipe.recipe_id}>
                    <h4>{recipe.name}</h4>
                    <p>{recipe.description}</p>
                    <button onClick={() => handleEditRecipe(recipe)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRecipe(recipe.recipe_id)}
                    >
                      Delete
                    </button>
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
