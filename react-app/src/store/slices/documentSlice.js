import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/documentReducers'

export const saveDocument = createAsyncThunk(
    'document/save',
    async (thunkAPI) => {
      const response = await api.post('/documents')
      return { response }
    }
)

export default createSlice({
    name: 'document',
    initialState: initialState,
    reducers,
    extraReducers: {
        [saveDocument.fulfilled]: (state, action) => {
          const data = {...action.payload}
          return ({...data})
        },
        [saveDocument.rejected]: (state, action) => {
          return {...initialState}
        }
    },
    middleware: [...getDefaultMiddleware()],
  })