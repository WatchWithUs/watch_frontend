import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../Context/auth.context';

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/collectionForm" className="navbar-link">Create Collections</Link>
      <Link to="/movieForm" className="navbar-link">Create Movie</Link>
      <Link to="/collectionList" className="navbar-link">Collections</Link>
      {user && <button onClick={handleLogout} className="logout-btn">Logout</button>}
    </nav>
  );
}

export default Navbar;
