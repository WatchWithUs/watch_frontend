import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateFormCollection.css";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_COLLECTION_FORM_VALUES = {
  title: "",
  description: "",
  movies: [],
};

function CreateFormCollection() {
  const [collection, setCollection] = useState(DEFAULT_COLLECTION_FORM_VALUES);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/collection`, collection);
      console.log("Collection created:", response.data);
      setCollection(DEFAULT_COLLECTION_FORM_VALUES);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollection((prevCollection) => ({
      ...prevCollection,
      [name]: value,
    }));
  };

  const handleMovieSelect = (movieId) => {
    setCollection((prevCollection) => ({
      ...prevCollection,
      movies: [...prevCollection.movies, movieId],
    }));
  };

  return (
    <div className="create-form-collection-container">
      <h2>Create Collection</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={collection.title}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={collection.description}
          onChange={handleInputChange}
        />
        <h3>Movies</h3>
        <ul className="create-form-collection-movies">
          {movies.map((movie) => (
            <li key={movie.id}>
              <input
                type="checkbox"
                id={`movie-${movie.id}`}
                onChange={() => handleMovieSelect(movie.id)}
              />
              <label htmlFor={`movie-${movie.id}`}>{movie.title}</label>
            </li>
          ))}
        </ul>
        <button type="submit" className="create-form-collection-button">
          Create Collection
        </button>{" "}
      </form>
    </div>
  );
}

export default CreateFormCollection;
