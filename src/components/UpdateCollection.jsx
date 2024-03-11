import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005"; 

function UpdateCollection({ collectionId }) {
  const [collection, setCollection] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCollectionDetails();
  }, []);

  const fetchCollectionDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection/${collectionId}`);
      setCollection(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  };

  const handleUpdateCollection = async () => {
    try {
      await axios.put(`${API_URL}/collection/${collectionId}`, {
        title: title,
        description: description,
        selectedMovies: collection.selectedMovies // Aqui você pode adicionar a lógica para atualizar os filmes selecionados, se necessário
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
      <button onClick={handleUpdateCollection}>Update Collection</button>
    </div>
  );
}

export default UpdateCollection;