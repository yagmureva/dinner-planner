import React, { useState } from "react";
import Calendar from "../CalendarPage/Calendar";
import RecipeManager from "../Recipe/RecipeManager";
import DinnerModel from "../DinnerModel";
import "./HomePage.css";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState({});

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleRecipeSelect = (recipe) => {
    if (selectedDate) {
      setSelectedRecipes({
        ...selectedRecipes,
        [selectedDate]: recipe,
      });
    } else {
      alert("Please select a date first!");
    }
  };

  return (
    <div className="homepage">
      <header>
        <div className="logo">Dinner Planner</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#recipes">Recipes</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          <a href="#signup">Sign Up</a>
          <a href="#login">Log In</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Plan Your Perfect Dinner with Ease</h1>
        <button>Get Started</button>
      </section>

      <section className="features" id="features">
        <h2>Features</h2>
        <div className="features-container">
          <div className="feature">
            <img src="/assets/calendar.svg" alt="Interactive Calendar" />
            <h3>Interactive Calendar</h3>
            <p>
              Plan your meals effortlessly with our interactive calendar. Select
              dates and add your planned meals for each day. Highlighted days
              show your planned dinners.
            </p>
            <Calendar onDateClick={handleDateClick} />
          </div>
          <div className="feature">
            <img src="/assets/recipes.svg" alt="Recipe Suggestions" />
            <h3>Recipe Manager</h3>
            <RecipeManager onRecipeSelect={handleRecipeSelect} />
          </div>
          <div className="feature">
            <img src="/assets/shoppinglist.svg" alt="Grocery List Generator" />
            <h3>Grocery List Generator</h3>
            <p>
              Generate a comprehensive grocery list based on your selected
              recipes. Add or remove items as needed to customize your shopping
              experience.
            </p>
          </div>
          <div className="feature">
            <img src="/assets/ingredients.svg" alt="Nutritional Information" />
            <h3>Nutritional Information</h3>
            <p>
              Stay informed about your meals' nutritional content. View detailed
              breakdowns of calories, macronutrients, and more for each recipe.
            </p>
          </div>
          <div className="feature">
            <h3>3D Dinner Model</h3>
            <DinnerModel />
          </div>
        </div>
        {selectedDate && selectedRecipes[selectedDate] && (
          <div className="selected-recipe">
            <h3>Recipe for {selectedDate}</h3>
            <p>{selectedRecipes[selectedDate].name}</p>
          </div>
        )}
      </section>

      <footer>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className="social-icons">
          <img src="/assets/github.svg" alt="GitHub" />
          <img src="/assets/linkedin.svg" alt="LinkedIn" />
        </div>
        <div className="newsletter-signup">
          <input type="email" placeholder="Enter your email" />
          <button>Sign Up</button>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
