import { getDefaultMiddleware, createSlice } from "@reduxjs/toolkit";

import { reducers, initialState } from 'store/reducers/paymentReducers'
  
export default createSlice({
    name: 'payment',
    initialState,
    reducers ,
    middleware: [...getDefaultMiddleware()],
  })