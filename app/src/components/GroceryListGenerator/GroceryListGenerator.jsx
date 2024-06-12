import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./GroceryListGenerator.css";

const GroceryListGenerator = () => {
  const [ingredients, setIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState("");

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim() !== "") {
      setIngredients([...ingredients, { name: customIngredient }]);
      setCustomIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredientName) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient.name !== ingredientName)
    );
  };

  return (
    <div className="grocery-list-generator">
      <Typography variant="h4">Grocery List Generator</Typography>
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
