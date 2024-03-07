import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.get(`/api/movies/search?q=${searchTerm}`);
      setSearchResults(response.data.movies);
    } catch (error) {
      console.error('Erro ao pesquisar filmes:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/collection">
        <button>Collections</button>
      </Link>

      <Link to="/collection/create">
        <button>Create Collection</button>
      </Link>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map(movie => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

//something