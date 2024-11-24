import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSllice';
import categorieReducer from './slices/categorieSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    categories: categorieReducer
  }
});

export default store;
