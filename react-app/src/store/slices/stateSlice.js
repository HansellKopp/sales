import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uniq } from 'lodash'
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/stateReducers'

export const getData = createAsyncThunk(
    'state/getData',
    async (thunkAPI) => {
      const offers = await api.get('/offers')
      const products = await api.get('/products')
      const parameters = await api.get('/parameters')
      const departaments = uniq(products.data.data.map(s=> s.departament)).sort()
      const selectedGroup = departaments[0] || ''
      return {
        offers:offers.data.data,
        products:products.data.data,
        parameters:parameters.data.data[0],
        departaments:departaments,
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
          console.log(state, action)
          return state
        }
    },
    middleware: [...getDefaultMiddleware()],
  })