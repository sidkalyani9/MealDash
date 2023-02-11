import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    // addToBasket: (state) => {
    //     state.items += 1
    //     console.log(state.items)
    // },
    removeFromBasket: (state, action) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = state => state.basket.items;

export default basketSlice.reducer