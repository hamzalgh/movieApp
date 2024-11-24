import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    movies: [],
    movie: []
}

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload
        },
        selectedMovie: (state, action) => {
            state.movie = action.payload
        }
    }
})

export const { setMovies, selectedMovie } = movieSlice.actions
export default movieSlice.reducer