import { configureStore } from "@reduxjs/toolkit";
import stateSlice from 'store/slices/stateSlice'
import cartSlice from 'store/slices/cartSlice'
import paymentSlice from 'store/slices/paymentSlice'

const store = configureStore({
  reducer: {
    state: stateSlice.reducer,
    cart: cartSlice.reducer,
    payment: paymentSlice.reducer,
  }
})
  
export default store