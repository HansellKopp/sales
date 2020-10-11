import { configureStore } from "@reduxjs/toolkit";
import stateSlice from 'store/slices/stateSlice'
import cartSlice from 'store/slices/cartSlice'

const store = configureStore({
  reducer: {
    state: stateSlice.reducer,
    cart: cartSlice.reducer,
  }
})
  
export default store