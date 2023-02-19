import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: "",
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state,action) => {
      state.search = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSearch} = searchSlice.actions

export const selectSearch = state => state.search.search;

export default searchSlice.reducer