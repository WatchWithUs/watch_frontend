import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
        const response = await axios.get('/collection'); // Rota para obter as coleções
      setCollections(response.data);
    } catch (error) {
      console.error('Erro ao buscar coleções:', error);
    }
  };

  return (
    <div>
      <h2>Collections</h2>
      {collections.map(collection => (
        <div key={collection._id}>
          <h3>{collection.title}</h3>
          <p>Description: {collection.description}</p>
          <ul>
            {collection.movies.map(movie => (
              <li key={movie._id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Collections;