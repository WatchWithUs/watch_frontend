import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005"; 

function UpdateCollection({ collectionId }) {
  const [collection, setCollection] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchCollectionDetails();
  }, []);

  const fetchCollectionDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection/${collectionId}`);
      setCollection(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setMovies(response.data.movies);
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  };

  const handleUpdateCollection = async () => {
    try {
      await axios.put(`${API_URL}/collection/${collectionId}`, {
        title: title,
        description: description,
        movies: movies
      });
      console.log('Collection updated successfully');
      // Adicione qualquer lógica adicional aqui após a atualização bem-sucedida
    } catch (error) {
      console.error('Error updating collection:', error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      // Remover o filme localmente da lista de filmes
      const updatedMovies = movies.filter(movie => movie._id !== movieId);
      setMovies(updatedMovies);
      
      // Atualizar a coleção no servidor sem o filme excluído
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

  const handleAddMovie = async (newMovieTitle) => {
    try {
      // Adicionar o novo filme localmente à lista de filmes
      const updatedMovies = [...movies, { title: newMovieTitle }];
      setMovies(updatedMovies);
      
      // Atualizar a coleção no servidor com o novo filme adicionado
      await axios.put(`${API_URL}/collection/${collectionId}`, {
        title: title,
        description: description,
        movies: updatedMovies
      });
      console.log('Movie added successfully');
    } catch (error) {
      console.error('Error adding movie:', error);
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
              <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleUpdateCollection}>Update Collection</button>
    </div>
  );
}

export default UpdateCollection;