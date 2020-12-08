import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uniq } from 'lodash'
import { api } from 'api'

import { reducers } from 'store/reducers/productReducers'

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (thunkAPI) => {
      const products = await api.get('/products')
      const departaments = uniq(products.data.data.map(s=> s.departament)).sort()
      return {
        products:products.data.data,
        departaments:departaments,
      }
    }
)

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',
  async (data, thunkAPI) => {    
    data.forEach(async (element) => {
       const result = await api.delete(`products/${element}`)
       if(!result.status===200) {
         console.log(result)
       }
    });
    const dispatch = thunkAPI.dispatch
    dispatch(getProducts())
  }
)

export default createSlice({
    name: 'products',
    initialState: { loading: 'loading' },
    reducers,
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
          return {...action.payload}
        },
        [getProducts.rejected]: (state, action) => {
          return state
        },
        [deleteProducts.fulfilled]: (state, action) => {
          return state
        },
        [deleteProducts.rejected]: (state, action) => {
          return state
        }
    },
    middleware: [...getDefaultMiddleware()],
  })