import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: {
    accessToken: null
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {
      state.auth.accessToken = action.payload
    },
    resetAuth: (state) => {
      state.auth.accessToken = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions

export const selectauth = state => state.auth.auth.accessToken;

export default authSlice.reducer