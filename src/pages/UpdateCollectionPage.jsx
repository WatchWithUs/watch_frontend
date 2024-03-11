import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005"; 

function UpdateCollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection/${id}`);
      setCollection(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching collection:', error);
    }
  };

  const handleUpdateCollection = async () => {
    try {
      await axios.put(`${API_URL}/collection/${id}`, { title, description });
      // Redirecionar para a página de coleções após a atualização
      window.location.href = "/collectionList";
    } catch (error) {
      console.error('Error updating collection:', error);
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
      <button onClick={handleUpdateCollection}>Update</button>
    </div>
  );
}

export default UpdateCollectionPage;