import { getDefaultMiddleware, createSlice } from "@reduxjs/toolkit";

import { reducers, initialState } from 'store/reducers/cartReducers'
  
export default createSlice({
    name: 'cart',
    initialState,
    reducers ,
    middleware: [...getDefaultMiddleware()],
  })