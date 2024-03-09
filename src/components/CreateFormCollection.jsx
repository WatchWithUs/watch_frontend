import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateFormCollection.css"; // Importe o arquivo CSS aqui

const API_URL = import.meta.env.VITE_API_URL;

function CreateFormCollection() {
  const [collectionName, setCollectionName] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieSelect = (movieId) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/collections`, {
        name: collectionName,
        movies: selectedMovies,
      });
      console.log("Collection created:", response.data);
      setCollectionName("");
      setSelectedMovies([]);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <div className="create-form-collection-container"> {/* Adicione a classe do CSS ao contêiner principal */}
      <form className="create-form-collection-form" onSubmit={handleSubmit}> {/* Adicione a classe do CSS ao formulário */}
        <label htmlFor="collectionName" className="create-form-collection-label">Collection Name:</label> {/* Adicione a classe do CSS ao rótulo */}
        <input
          type="text"
          id="collectionName"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="create-form-collection-input" // Adicione a classe do CSS à entrada de texto
        />
        <h3>Movies</h3>
        <ul className="create-form-collection-movies"> {/* Adicione a classe do CSS à lista de filmes */}
          {movies.map((movie) => (
            <li key={movie.id} className="create-form-collection-movie-item"> {/* Adicione a classe do CSS ao item da lista */}
              <input
                type="checkbox"
                id={`movie-${movie.id}`}
                checked={selectedMovies.includes(movie.id)}
                onChange={() => handleMovieSelect(movie.id)}
              />
              <label htmlFor={`movie-${movie.id}`}>{movie.title}</label>
            </li>
          ))}
        </ul>
        <button type="submit" className="create-form-collection-button create-form-collection-submit-button">Create Collection</button> {/* Adicione a classe do CSS ao botão de submissão */}
      </form>
    </div>
  );
}

export default CreateFormCollection;
