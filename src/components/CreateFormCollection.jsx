
import React, { useState, useEffect } from 'react';
import axios from "axios";

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
            setSelectedMovies(selectedMovies.filter(id => id !== movieId));
        } else {
            setSelectedMovies([...selectedMovies, movieId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/collections`, {
                name: collectionName,
                movies: selectedMovies
            });
            console.log("Collection created:", response.data);
            setCollectionName("");
            setSelectedMovies([]);
        } catch (error) {
            console.error("Error creating collection:", error);
        }
    };

    return (
        <div>
            <h2>Create Collection</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="collectionName">Collection Name:</label>
                <input
                    type="text"
                    id="collectionName"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                />
                <h3>Movies</h3>
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
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
                <button type="submit">Create Collection</button>
            </form>
        </div>
    );
}

export default CreateFormCollection;