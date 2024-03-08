import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState(0);
    const [movie,setMovie] = useState("");

    //const storedToken = localStorage.getItem("authToken");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { ...movie}
        axios
            .post(`${API_URL}/movies` ,requestBody)
            .then((response) => {
                const newMovie = response.data;
                // navigate(`/cohorts/details/${newCohort._id}`);
            })
            .catch((error) => console.log(error));
    };

    //const handleTitleInput = e => setTitle(e.target.value);
    const handleTitleInput = e => {
        setTitle(e.target.value);
        setMovie({ ...movie, title: e.target.value });
    };
    const handleDescriptionInput = e => {
        setDescription(e.target.value);
        setMovie({ ...movie, description: e.target.value });
    };


    const handleGenreInput = e => {
        setGenre(e.target.value);
        setMovie({ ...movie, genre: e.target.value });
    }
    const handleImageInput = e => {
        setImage(e.target.value);
        setMovie({ ...movie, image: e.target.value });
    }
    const handleYearInput = e =>{ 
        setYear(e.target.value);
        setMovie({ ...movie, year: e.target.value });
    }

return (
    <div>
        <h2> Create Form Movie</h2>
        <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">title:</label>
         <input
                type="String"
                name="title"
                id="title"
                value={title}
                onChange={handleTitleInput} 
            />
            
           <label htmlFor="description">description:</label>
           <input
                type="String"
                name="description"
                id="description"
                value={description}
                onChange={handleDescriptionInput}
            />
            <label htmlFor="genre">genre:</label>
            <input
                type="String"
                name="genre"
                id="genre"
                value={genre}
                onChange={handleGenreInput}
            />
            <label htmlFor="image">image:</label>
             <input
                type="String"
                name="image"
                id="image"
                value={image}
                onChange={handleImageInput}
            />
           <label htmlFor="year">year:</label>
            <input
                type="Number"
                name="year"
                id="year"
                value={year}
                onChange={handleYearInput}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
)
}

export default CreateFormMovie;