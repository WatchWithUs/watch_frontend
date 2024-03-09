import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CreateFormMovie.css";

const API_URL = import.meta.env.VITE_API_URL;

// const DEFAULT_FILM_FORM_VALUES = {
//     title: "",
//     description: "",
//     genre: "",
//     image: "",
//     year: 0,
//     timestamps: true
// }

function CreateFormMovie() {

    const [movie, setMovie] = useState({ ...DEFAULT_FILM_FORM_VALUES });
    const [title, setTitle] = useState({ ...DEFAULT_FILM_FORM_VALUES });
    const [description, setDescription] = useState({ ...DEFAULT_FILM_FORM_VALUES });
    const [genre, setGenre] = useState({ ...DEFAULT_FILM_FORM_VALUES });
    const [image, setImage] = useState({ ...DEFAULT_FILM_FORM_VALUES });
    const [year, setYear] = useState({ ...DEFAULT_FILM_FORM_VALUES });

    //const storedToken = localStorage.getItem("authToken");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { ...movie}
        axios
            .post(`${API_URL}/movies` ,movie)
            .then((response) => {
                const newMovie = response.data;
            })
            .catch((error) => console.log(error));
    };

    const handleTitleInput = e => setTitle(e.target.value);
    const handleDescriptionInput = e => setDescription(e.target.value);
    const handleGenreInput = e => setGenre(e.target.value);
    const handleImageInput = e => setImage(e.target.value);
    const handleYearInput = e => setYear(e.target.value);

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