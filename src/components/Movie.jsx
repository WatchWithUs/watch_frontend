import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Movie(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = parseInt(props.colectionId);

    const newMovie = {
      collectionId: id,
      title: title,
      description: description,
    };

    axios
      .post(`${API_URL}/movies`, newMovie)
      .then((response) => {
        setTitle("");
        setDescription("");

        props.callbackToRefreshProject();
      })
      .catch((error) => {
        console.log("Error creating new movie...");
        console.log(error);
      });
  };

  return <div>Component Movie</div>;
}

export default Movie;
