import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005"; 

function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection`); 
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      await axios.delete(`${API_URL}/collection/${collectionId}`); 
      fetchCollections();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  return (
    <div>
      <h3>Collections</h3>
      <ul>
        {collections.map(collection => (
          <li key={collection._id}>
            <h4>{collection.title}</h4>
            <p>{collection.description}</p>
            <ul>
              {collection.movies.map(movie => (
                <li key={movie._id}>{movie.title}</li>
              ))}
            </ul>
            <button onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionList;