import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL; 

function UpdateCollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCollection();
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

  const handleUpdateCollection = async () => {
    try {
      setIsLoading(true);
      await axios.put(`${API_URL}/collection/${id}`, { title, description, movies });
      setIsLoading(false);
      window.location.href = "/collectionList";
      console.log('movies: ',movies)
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating collection:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const updatedMovies = movies.filter(movie => movie._id !== movieId);
      setMovies(updatedMovies);
      await axios.put(`${API_URL}/collection/${id}`, { title, description, movies: updatedMovies });
      console.log('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      if (newMovie.trim() !== "") {
        const updatedMovies = [...movies, { title: newMovie }];
        setMovies(updatedMovies);
        setNewMovie(""); // Reset input field after adding movie
        await axios.put(`${API_URL}/collection/${id}`, { title, description, movies: updatedMovies });
        console.log('Movie added successfully');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div>
      <h3>Update Collection</h3>
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
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
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
      <button onClick={handleUpdateCollection} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}

export default UpdateCollectionPage;
// import React from 'react';
// import UpdateCollection from "../components/UpdateCollection";

// function UpdateCollectionPage() {
//   return (
//     <div>
//       <UpdateCollection />
//     </div>
//   );
// }

// export default UpdateCollectionPage;