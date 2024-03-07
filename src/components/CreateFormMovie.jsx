import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_FILM_FORM_VALUES = {
    title: "",
    description: "",
    genre: "",
    image: "",
    year: 0,
    timestamps: true
}

function CreateFormMovie() {

    const [movie, setMovie] = useState({ ...DEFAULT_FILM_FORM_VALUES });
    const storedToken = localStorage.getItem("authToken");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${API_URL}/movies`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const newMovie = response.data;
                // navigate(`/cohorts/details/${newCohort._id}`);
            })
            .catch((error) => console.log(error));
    };



return (
    <div>
        <h2> Create Form Movie</h2>
        <form onSubmit={handleFormSubmit}>
            <input
                type="String"
                name="title"
                id="title"

            />
            <input
                type="String"
                name="description"
                id="description"

            />
            <input
                type="String"
                name="genre"
                id="genre"

            />
            <input
                type="String"
                name="image"
                id="image"

            />
            <input
                type="Number"
                name="year"
                id="year"

            />
            <button type="submit">Submit</button>
        </form>
    </div>
)
}

export default CreateFormMovie;