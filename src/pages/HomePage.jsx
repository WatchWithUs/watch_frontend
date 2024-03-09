import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Importando o CSS que você criou

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="overlay"></div>
      <div className="homepage-content">
        <img src="WatchWhitUslogo.png" alt="Logo" className="homepage-logo" />
        <div className="homepage-buttons">
          <Link to="/signup" className="button button-signup">Sign Up</Link>
          <Link to="/login" className="button button-login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;