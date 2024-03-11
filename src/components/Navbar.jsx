import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/collectionForm">
        <button>Create Collections</button>
      </Link>

      <Link to="/movieForm">
        <button>Create Movie</button>
      </Link>

      <Link to="/collectionList">
        <button>Collections</button>
      </Link>

    </nav>
  );
}

export default Navbar;
