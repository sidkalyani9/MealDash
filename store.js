import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import restaurantReducer from './features/restaurantSlice'

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    basket: basketReducer,
  },
});