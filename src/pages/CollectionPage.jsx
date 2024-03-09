import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateFormCollection from '../components/CreateFormCollection';


function CollectionPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5005/collection'); // Substitua 'http://localhost:3000' pela URL do seu servidor
        setCollections(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <h2>Collections</h2>
      <ul>
        {collections.map(collection => (
          <li key={collection._id}>{collection.title}</li>
        ))}
      </ul>
      <CreateFormCollection />
    </div>
  );
}

export default CollectionPage;