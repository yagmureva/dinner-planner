import React, { useState, useEffect } from "react";
import api from "../../api";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./GroceryListGenerator.css";

const GroceryListGenerator = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(api("/recipes"));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchRecipes();
  }, []);

  useEffect(() => {
    async function fetchIngredients() {
      if (selectedRecipes.length === 0) {
        setIngredients([]);
        return;
      }

      try {
        const ingredientPromises = selectedRecipes.map((recipeId) =>
          fetch(api(`/recipes/${recipeId}/ingredients`)).then((response) =>
            response.json()
          )
        );
        const ingredientsArray = await Promise.all(ingredientPromises);
        const combinedIngredients = ingredientsArray.flat();
        setIngredients(combinedIngredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    }

    fetchIngredients();
  }, [selectedRecipes]);

  const handleRecipeSelection = (recipeId) => {
    console.log(`Recipe selected: ${recipeId}`);
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleAddCustomIngredient = () => {
    console.log(`Adding custom ingredient: ${customIngredient}`);
    if (customIngredient.trim() !== "") {
      setIngredients([...ingredients, { name: customIngredient }]);
      setCustomIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredientName) => {
    console.log(`Removing ingredient: ${ingredientName}`);
    setIngredients(
      ingredients.filter((ingredient) => ingredient.name !== ingredientName)
    );
  };

  return (
    <div className="grocery-list-generator">
      <Typography variant="h4">Grocery List Generator</Typography>
      <div className="recipe-selection">
        <Typography variant="h5">Select Recipes</Typography>
        <List>
          {recipes.map((recipe) => (
            <ListItem
              key={recipe.recipe_id}
              button
              onClick={() => handleRecipeSelection(recipe.recipe_id)}
            >
              <Checkbox checked={selectedRecipes.includes(recipe.recipe_id)} />
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className="grocery-list">
        <Typography variant="h5">Grocery List</Typography>
        <List>
          {ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient.name} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveIngredient(ingredient.name)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
        <div className="add-custom-ingredient">
          <TextField
            label="Add Custom Ingredient"
            variant="outlined"
            fullWidth
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddCustomIngredient}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroceryListGenerator;
