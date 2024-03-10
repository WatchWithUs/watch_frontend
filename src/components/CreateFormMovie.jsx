import React, { useState } from "react";
import axios from "axios";
import "./CreateFormMovie.css";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_FILM_FORM_VALUES = {
    title: "",
    description: "",
    genre: "",
    image: "",
    year: 0,
};

function CreateFormMovie() {

    const [movie, setMovie] = useState(DEFAULT_FILM_FORM_VALUES);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${API_URL}/movies`, movie)
            .then((response) => {
                const newMovie = response.data;
                setMovie(DEFAULT_FILM_FORM_VALUES);
            })
            .catch((error) => console.log(error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value
        }));
    };

    return (
        <div className="form-container">
            <h2>Create Form Movie</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={movie.title}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={movie.description}
                    onChange={handleInputChange}
                />
                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    name="genre"
                    id="genre"
                    value={movie.genre}
                    onChange={handleInputChange}
                />
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    value={movie.image}
                    onChange={handleInputChange}
                />
                <label htmlFor="year">Year:</label>
                <input
                    type="number"
                    name="year"
                    id="year"
                    value={movie.year}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateFormMovie;