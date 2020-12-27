import { configureStore } from "@reduxjs/toolkit";
import authSlice from 'store/slices/authSlice'
import stateSlice from 'store/slices/stateSlice'
import cartSlice from 'store/slices/cartSlice'
import paymentSlice from 'store/slices/paymentSlice'
import documentSlice from 'store/slices/documentSlice'
import productSlice from 'store/slices/productSlice'
import reportSlice from 'store/slices/reportSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    state: stateSlice.reducer,
    cart: cartSlice.reducer,
    document: documentSlice.reducer,
    payment: paymentSlice.reducer,
    product: productSlice.reducer,
    report: reportSlice.reducer,
  }
})
  
export default store