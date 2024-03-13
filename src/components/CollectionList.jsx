import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CollectionList.css'; 
import Logout from './Logout';

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
    try {
      await axios.delete(`${API_URL}/collection/${collectionId}`);
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
          <li key={collection._id} className="collection-item"> {/* Adicionando uma classe CSS para o item da coleção */}
            <h4 className="collection-title">{collection.title}</h4> {/* Adicionando a classe CSS para o título da coleção */}
            <p className="collection-description">{collection.description}</p> {/* Adicionando a classe CSS para a descrição da coleção */}
            <ul className="movie-list"> {/* Adicionando a classe CSS para a lista de filmes */}
              {collection.movies.map(movie => (
                <li key={movie._id}>{movie.title}</li>
              ))}
            </ul>
            <button className="button" onClick={() => handleDeleteCollection(collection._id)}>Delete</button> {/* Adicionando a classe CSS para o botão de exclusão */}
            <Link className="button" to={`/collections/${collection._id}/update`}>Update</Link> {/* Adicionando a classe CSS para o botão de atualização */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionList;