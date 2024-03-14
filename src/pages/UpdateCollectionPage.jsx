import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateCollectionPage.css';

const API_URL = import.meta.env.VITE_API_URL;

function UpdateCollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [availableMovies, setAvailableMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCollection();
    fetchAvailableMovies();
  }, []);

  const fetchCollection = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection/${id}`);
      setCollection(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setMovies(response.data.movies);
    } catch (error) {
      console.error('Error fetching collection:', error);
    }
  };

  const fetchAvailableMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      setAvailableMovies(response.data);
    } catch (error) {
      console.error('Error fetching available movies:', error);
    }
  };

  const handleUpdateCollection = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setIsLoading(true);
      await axios.put(`${API_URL}/collection/${id}`, { title, description, selectedMovies: movies }, { headers: { Authorization: `Bearer ${token}` } });
      setIsLoading(false);
      navigate("/collectionList");
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating collection:', error);
    }
  };

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter(movie => movie._id !== movieId);
    setMovies(updatedMovies);
    console.log('Movie deleted successfully');
  };

  const handleAddMovies = () => {
   
    const selectedMoviesDetails = availableMovies.filter(movie => selectedMovies.includes(movie._id));
    
    
    const updatedMovies = [...movies, ...selectedMoviesDetails];
    setMovies(updatedMovies);
    setSelectedMovies([]); 

    console.log('Movies added successfully');
  };

  return (
    <div className="container">
      <h3>Update Your Collection</h3>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <h4>Movies:</h4>
        <ul className='movie-container'>
  {movies.map((movie, index) => (
    <li key={index}>
      <span>{movie.title}</span>
      <button onClick={() => handleDeleteMovie(movie._id)}>❌</button>
    </li>
  ))}
</ul>
      </div>
      <div>
        <h4>📽️Select Movies to Add:</h4>
        <select multiple value={selectedMovies} onChange={(e) => setSelectedMovies([...e.target.selectedOptions].map(option => option.value))}>
          {availableMovies.map((movie, index) => (
            <option key={index} value={movie._id}>{movie.title}</option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleAddMovies}>Add Movies</button>
        <button onClick={handleUpdateCollection} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
}

export default UpdateCollectionPage;