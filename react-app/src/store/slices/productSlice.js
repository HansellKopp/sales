import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uniq } from 'lodash'
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/productReducers'

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (thunkAPI) => {
      const products = await api.get('/products')
      const departaments = uniq(products.data.data.map(s=> s.departament)).sort()
      return {
        products:products.data.data,
        departaments:departaments,
      }
    }
)

export const saveProduct = createAsyncThunk(
  'product/saveProduct',
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI
    let response = null
    if(!data.id) {
      response = await api.post(`/products`, data)
    } else {
      response = await api.put(`/products/${data.id}`, data)
    }    
    dispatch(getProducts())
    return {...response.data.data}
  }
)

export const deleteProducts = createAsyncThunk(
  'product/deleteProducts',
  async (data, thunkAPI) => {    
    const dispatch = thunkAPI.dispatch
    data.forEach(async (element) => {
       const result = await api.delete(`products/${element}`)
       if(!result.status===200) {
         console.log(result)
       }
    });    
    dispatch(getProducts())
  }
)

export default createSlice({
    name: 'product',
    initialState: { ...initialState },
    reducers,
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
          return {...state, ...action.payload}
        },
        [getProducts.rejected]: (state, action) => {
          return state
        },
        [deleteProducts.fulfilled]: (state, action) => {
          return state
        },
        [deleteProducts.rejected]: (state, action) => {
          return state
        },
        [saveProduct.fulfilled]: (state, action) => {
          console.log(action.payload)
          return state
        },
        [saveProduct.rejected]: (state, action) => {
          console.log(action.payload)
          return state
        }

    },
    middleware: [...getDefaultMiddleware()],
  })