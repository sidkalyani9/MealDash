import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.user = action.payload
      console.log(state.user)
    },
    resetUser: (state) => {
      state.user = null
      console.log(state.user)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser} = userSlice.actions

export const selectUser = state => state.user.user;

export default userSlice.reducer