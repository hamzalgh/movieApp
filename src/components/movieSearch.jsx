import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/slices/movieSllice";
import apiKey from '../API/APIKey';

const MovieSearch = () => {
  const dispatch = useDispatch()

  const [query, setQuery] = useState('');

  const apiURL = 'https://api.themoviedb.org/3/search/movie';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(apiURL, {
        params: {
          api_key: apiKey,
          query: query,
          language: 'en-US',
        },
      });
      dispatch(setMovies(response.data.results))
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MovieSearch;
