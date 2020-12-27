import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/reportReducers'

export const getSummary = createAsyncThunk(
  'report/summary',
     async (data, thunkAPI) => {
     const response = await api.get(`/reports/summary?date=${data.date}`)
     const report = response.data.data
     report.readyToPrint = true
     return {...report}
   }
)

export default createSlice({
    name: 'report',
    initialState: initialState,
    reducers,
    extraReducers: {
         [getSummary.fulfilled]: (state, action) => {
           const newState = {...state}
           newState.summary = {...action.payload}
          return {...newState}
         },
         [getSummary.rejected]: (state, action) => {
           return {...initialState}
         } 
    },
    middleware: [...getDefaultMiddleware()],
  })