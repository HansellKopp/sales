import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/stateReducers'

export const getData = createAsyncThunk(
    'state/getData',
    async (thunkAPI) => {
      const offers = await api.get('/offers')
      const parameters = await api.get('/parameters')
      const selectedGroup = ''
      return {
        offers:offers.data.data,
        parameters:parameters.data.data[0],
        selectedGroup: selectedGroup
      }
    }
)

export default createSlice({
    name: 'state',
    initialState: { loading: 'loading' },
    reducers,
    extraReducers: {
        [getData.fulfilled]: (state, action) => {
          const data = {...action.payload}
          return ({...data, ...initialState})
        },
        [getData.rejected]: (state, action) => {
          return state
        }
    },
    middleware: [...getDefaultMiddleware()],
  })