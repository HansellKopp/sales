import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from 'api'

import { getProducts } from './productSlice'
import { reducers, initialState } from 'store/reducers/documentReducers'

export const saveInvoice = createAsyncThunk(
  'document/saveInvoice',
     async (data, thunkAPI) => {
     const { dispatch } = thunkAPI      
     const response = await api.post('/invoices', data)
     dispatch({ type: 'cart/clear' })
     dispatch({ type: 'payment/clear' })
     dispatch({ type: 'document/clear' })
     dispatch(getProducts())
     return response.data.data
   }
)

export const getInvoice = createAsyncThunk(
  'document/getInvoice',
     async (id) => {
     const response = await api.get(`/invoices/${id}`)
     return response.data.data
   }
)

export const getInvoicesDates = createAsyncThunk(
  'document/getInvoicesDates',
     async (data, thunkAPI) => {
     const response = await api.get(`/invoices/dates?from=${data.from}&to=${data.to}`)
     return response.data.data
   }
)

export const getPurchase = createAsyncThunk(
  'document/getPurchase',
     async (id, thunkAPI) => {
     const { dispatch } = thunkAPI      
     const response = await api.get(`/purchases/${id}`)
     dispatch({ type: 'document/setPurchases', payload: response.data.data })
     return null
   }
)

export const getPurchasesDates = createAsyncThunk(
  'document/getPurchasesDates',
     async (data, thunkAPI) => {
     const response = await api.get(`/purchases/dates?from=${data.from}&to=${data.to}`)
     return response.data.data
   }
)

export const savePurchase = createAsyncThunk(
  'document/savePurchase',
     async (data, thunkAPI) => {
     const { dispatch } = thunkAPI      
     const response = await api.post('/purchases', data)
     dispatch(getProducts())
     return { ...response.data }
   }
)

export default createSlice({
    name: 'document',
    initialState: initialState,
    reducers,
    extraReducers: {
        [saveInvoice.fulfilled]: (state, action) => {
          const newState = {...state}
          newState.invoice={...action.payload, readyToPrint: true}
          return {...newState}
         },
         [saveInvoice.rejected]: (state, action) => {
           return {...initialState}
         },
         [getInvoice.fulfilled]: (state, action) => {
           const newState = {...state}
           newState.invoice={...action.payload, readyToPrint: true}
          return {...newState}
         },
         [getInvoice.rejected]: (state, action) => {
            const newState = {...state}
            newState.invoice={...action.payload, readyToPrint: false}
          return {...state}
         },
         [getInvoicesDates.fulfilled]: (state, action) => {
          const newState = {...state}
          newState.invoices = [...action.payload]
          return {...newState}
        },
        [getInvoicesDates.rejected]: (state, action) => {
           const newState = {...state}
           newState.invoices=[]
         return {...newState}
        },
        [savePurchase.fulfilled]: (state, action) => {
          const newState = {...state}
          newState.purchase=initialState.purchase
          newState.purchases=initialState.purchases
          return {...newState}
        },
         [savePurchase.rejected]: (state, action) => {
           return {...initialState}
         },
         [getPurchasesDates.fulfilled]: (state, action) => {
          const newState = {...state}
          newState.purchases = [...action.payload]
          return {...newState}
        },
        [getPurchasesDates.rejected]: (state, action) => {
           const newState = {...state}
           newState.purchases=[]
         return {...newState}
        }
    },
    middleware: [...getDefaultMiddleware()],
  })