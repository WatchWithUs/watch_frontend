
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollectionsPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get('/api/collections')
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Coleções</h1>
      {collections.map(collection => (
        <div key={collection.id}>
          <h2>{collection.name}</h2>
          <p>{collection.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CollectionsPage;