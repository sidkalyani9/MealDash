import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import restaurantReducer from './features/restaurantSlice'
import searchReducer from './features/searchSlice'
import userReducer from './features/userSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    basket: basketReducer,
    search: searchReducer,
    user: userReducer,
    auth: authReducer,
  },
});