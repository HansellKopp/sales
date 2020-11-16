import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/documentReducers'

export const saveDocument = createAsyncThunk(
   'document/saveDocument',
      async (data) => {
      const response = await api.post('/documents', data)
      console.log(data, response)
      return { ...data.document }
    }
)

export default createSlice({
    name: 'document',
    initialState: initialState,
    reducers,
    extraReducers: {
        [saveDocument.fulfilled]: (state, action) => {
         // const data = {...action.payload}
         // return ({...data})
         return {...state}
        },
        [saveDocument.rejected]: (state, action) => {
          return {...initialState}
        }
    },
    middleware: [...getDefaultMiddleware()],
  })