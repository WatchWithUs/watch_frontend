import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollectionDetailPage({ match }) {
  const [collection, setCollection] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const fetchCollectionDetail = async () => {
      try {
        const collectionId = match.params.collectionId;
        const collectionResponse = await axios.get(`/api/collections/${collectionId}`);
        setCollection(collectionResponse.data);

        const moviesResponse = await axios.get(`/api/collections/${collectionId}/movies`);
        setMovies(moviesResponse.data.movies);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCollectionDetail();
  }, [match.params.collectionId]);

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{collection.name}</h1>
      <p>{collection.description}</p>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionDetailPage;