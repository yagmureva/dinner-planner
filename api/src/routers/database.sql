-- Veritabanı Oluşturma
CREATE DATABASE MealPlanner;

USE MealPlanner;

-- Users Tablosu
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recipes Tablosu
CREATE TABLE Recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    prep_time INT,
    cook_time INT,
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Ingredients Tablosu
CREATE TABLE Ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- RecipeIngredients Tablosu
CREATE TABLE RecipeIngredients (
    recipe_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    ingredient_id INT,
    quantity FLOAT,
    measurement_unit VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
);

-- MealPlan Tablosu
CREATE TABLE MealPlan (
    meal_plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    week_start_date DATE,
    week_end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- MealPlanRecipes Tablosu
CREATE TABLE MealPlanRecipes (
    meal_plan_recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    meal_plan_id INT,
    recipe_id INT,
    day_of_week VARCHAR(20),
    FOREIGN KEY (meal_plan_id) REFERENCES MealPlan(meal_plan_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

-- Örnek Veriler Ekleme

-- Users Verileri
INSERT INTO Users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_doe', 'jane@example.com', 'password456');

-- Ingredients Verileri
INSERT INTO Ingredients (name) VALUES
('Chicken'),
('Salt'),
('Pepper'),
('Olive Oil'),
('Garlic'),
('Onion'),
('Tomato'),
('Pasta');

-- Recipes Verileri
INSERT INTO Recipes (name, description, prep_time, cook_time, user_id) VALUES
('Grilled Chicken', 'Delicious grilled chicken with herbs', 15, 30, 1),
('Tomato Pasta', 'Simple and tasty tomato pasta', 10, 20, 2);

-- RecipeIngredients Verileri
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, measurement_unit) VALUES
(1, 1, 1, 'kg'),
(1, 2, 1, 'tsp'),
(1, 3, 1, 'tsp'),
(1, 4, 2, 'tbsp'),
(2, 7, 4, 'pcs'),
(2, 8, 200, 'g'),
(2, 5, 2, 'cloves'),
(2, 6, 1, 'pcs');

-- MealPlan Verileri
INSERT INTO MealPlan (user_id, week_start_date, week_end_date) VALUES
(1, '2024-06-03', '2024-06-09'),
(2, '2024-06-03', '2024-06-09');

-- MealPlanRecipes Verileri
INSERT INTO MealPlanRecipes (meal_plan_id, recipe_id, day_of_week) VALUES
(1, 1, 'Monday'),
(1, 2, 'Wednesday'),
(2, 2, 'Tuesday'),
(2, 1, 'Thursday');