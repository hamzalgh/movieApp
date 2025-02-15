import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    movies: [],
    movie: {},
    dependency: {
        similar: [],
        related: []
    }
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
        },
        setSimilar: (state, action) => {
            state.dependency.similar = action.payload
        },
        setRelated: (state, action) => {
            state.dependency.related = action.payload
        }
    }
})

export const { setMovies, selectedMovie, setSimilar, setRelated } = movieSlice.actions
export default movieSlice.reducer