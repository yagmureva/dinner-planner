import React from "react";
import calender from "../../assets/calender.svg";
import recipes from "../../assets/recipes.svg";
import shoppinglist from "../../assets/shoppinglist.svg";
import ingredients from "../../assets/ingredients.svg";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import Calendar from "../CalendarPage/Calendar";
import RecipeManager from "../Recipe/RecipeManager";
import "./HomePage.css";

function HomePage() {
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
            <img src={calender} alt="Interactive Calendar" />
            <h3>Interactive Calendar</h3>
            <p>
              Plan your meals effortlessly with our interactive calendar. Select
              dates and add your planned meals for each day. Highlighted days
              show your planned dinners.
            </p>
            <Calendar />
          </div>
          <div className="feature">
            <img src={recipes} alt="Recipe Suggestions" />
            <RecipeManager />
          </div>
          <div className="feature">
            <img src={shoppinglist} alt="Grocery List Generator" />
            <h3>Grocery List Generator</h3>
            <p>
              Generate a comprehensive grocery list based on your selected
              recipes. Add or remove items as needed to customize your shopping
              experience.
            </p>
            <button>Generate Grocery List</button>
          </div>
          <div className="feature">
            <img src={ingredients} alt="Nutritional Information" />
            <h3>Nutritional Information</h3>
            <p>
              Stay informed about your meals' nutritional content. View detailed
              breakdowns of calories, macronutrients, and more for each recipe.
            </p>
            <button>View Nutrition Details</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className="social-icons">
          <img src={github} alt="GitHub" />
          <img src={linkedin} alt="LinkedIn" />
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
