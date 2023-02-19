import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import restaurantReducer from './features/restaurantSlice'
import searchReducer from './features/searchSlice'

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    basket: basketReducer,
    search: searchReducer,
  },
});