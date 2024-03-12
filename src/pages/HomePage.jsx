import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context"; // Importe o contexto de autenticação
import "./HomePage.css";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext); // Acesse o estado de autenticação do contexto

  return (
    <div className="homepage-container">
      <div className="overlay"></div>
      <div className="homepage-content">
        <img src="WatchWhitUslogo.png" alt="Logo" className="homepage-logo" />
        <div className="homepage-buttons">
          {/* Renderização condicional dos botões com base no estado de autenticação */}
          {!isLoggedIn && (
            <>
              <Link to="/signup" className="button button-signup">
                Sign Up
              </Link>
              <Link to="/login" className="button button-login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;