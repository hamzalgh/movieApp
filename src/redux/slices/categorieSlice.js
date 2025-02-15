import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories: []
}

export const categorieSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategorie: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const { setCategorie } = categorieSlice.actions
export default categorieSlice.reducer