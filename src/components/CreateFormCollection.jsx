import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateFormCollection.css";

const API_URL = import.meta.env.VITE_API_URL;

function CreateFormCollection() {
  const [collectionName, setCollectionName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null); // Alterado para armazenar apenas um filme selecionado
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
    setSelectedMovie(movieId); // Atualiza o filme selecionado para o último clicado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!collectionName || !selectedMovie) {
      console.error("Collection name and movie must be selected.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/collections`, {
        name: collectionName,
        movies: [selectedMovie], // Adiciona apenas o filme selecionado à lista de filmes
      });
      console.log("Collection created:", response.data);
      setCollectionName("");
      setSelectedMovie(null); // Limpa o filme selecionado após a criação da coleção
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <div className="create-form-collection-container">
      <form className="create-form-collection-form" onSubmit={handleSubmit}>
        <label htmlFor="collectionName" className="create-form-collection-label">
          Collection Name:
        </label>
        <input
          type="text"
          id="collectionName"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="create-form-collection-input"
        />
        <h3>Movies</h3>
        <ul className="create-form-collection-movies">
          {movies.map((movie) => (
            <li key={movie.id} className="create-form-collection-movie-item">
              <input
                type="checkbox"
                id={`movie-${movie.id}`}
                checked={selectedMovie === movie.id} // Alterado para verificar se o filme está selecionado
                onChange={() => handleMovieSelect(movie.id)}
              />
              <label htmlFor={`movie-${movie.id}`}>{movie.title}</label>
              <button
                type="button"
                onClick={() => handleMovieSelect(movie.id)} // Adiciona o filme à coleção ao clicar no botão
                className="create-form-collection-add-button"
              >
                Add to Collection
              </button>
            </li>
          ))}
        </ul>
        <button type="submit" className="create-form-collection-button create-form-collection-submit-button">
          Create Collection
        </button>
      </form>
    </div>
  );
}

export default CreateFormCollection;
