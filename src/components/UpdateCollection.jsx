import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCollection({ collectionId }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchCollectionDetails();
  }, []);

  const fetchCollectionDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection/${collectionId}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setMovies(response.data.movies);
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  };

  const handleUpdateCollection = async () => {
    try {
      setIsUpdating(true);
      await axios.put(`${API_URL}/collection/${collectionId}`, {
        title: title,
        description: description,
        movies: movies
      });

      setIsUpdating(false);
      console.log('Collection updated successfully');
    } catch (error) {
      setIsUpdating(false);
      console.error('Error updating collection:', error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddMovie = async () => {
    try {
      if (newMovie.trim() !== "") {
        const updatedMovies = [...movies, { title: newMovie }];
        setMovies(updatedMovies);
        setNewMovie(""); // Reset input field after adding movie
        await axios.put(`${API_URL}/collection/${collectionId}`, {
          title: title,
          description: description,
          movies: updatedMovies
        });
        console.log('Movie added successfully');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const updatedMovies = movies.filter(movie => movie._id !== movieId);
      setMovies(updatedMovies);

      await axios.put(`${API_URL}/collection/${collectionId}`, {
        title: title,
        description: description,
        movies: updatedMovies
      });

      console.log('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h2>Update Collection</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <h3>Movies:</h3>
        <ul>
          {movies.map(movie => (
            <li key={movie._id}>
              {movie.title}
              <button onClick={() => handleDeleteMovie(movie._id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>
          <input type="text" value={newMovie} onChange={(e) => setNewMovie(e.target.value)} />
          <button onClick={handleAddMovie}>Add Movie</button>
        </div>
      </div>
      <button onClick={handleUpdateCollection} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Collection'}
      </button>
    </div>
  );
}

export default UpdateCollection;