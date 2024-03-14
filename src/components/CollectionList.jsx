import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CollectionList.css'; 

const API_URL = import.meta.env.VITE_API_URL; 

function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${API_URL}/collection`);
      setCollections(response.data);
      console.log(collections)
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/collection/${collectionId}`,{headers: { Authorization: `Bearer ${token}` }} );
      fetchCollections();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  return (
    <div className="collection-list">
      <h3>Collections</h3>
      <ul>
        {collections.map(collection => (
          <li key={collection._id} className="collection-item"> 
            <h4 className="collection-title">{collection.title}</h4> 
            <p className="collection-description">{collection.description}</p> 
            <ul className="movie-list">
              {collection.movies.map(movie => (
                <li key={movie._id}>{movie.title}</li>
              ))}
            </ul>
            <button className="button" onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
            <Link className="button" to={`/collections/${collection._id}/update`}>Update</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionList;