import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/slices/movieSllice";
import apiKey from '../API/APIKey';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';

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
    <form onSubmit={handleSearch} className='flex justify-between items-center gap-4 relative'>
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="w-md pl-8"
      />
    </form>
  );
};

export default MovieSearch;
