import { getDefaultMiddleware, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from 'api'

import { reducers, initialState } from 'store/reducers/authReducers'

export const userLogin = createAsyncThunk(
   'auth/login',
      async (data, thunkAPI) => {
      // const { dispatch } = thunkAPI
      const response = await api.post('/auth/login', {...data})
      return { ...response.data }
    }
)

export default createSlice({
    name: 'auth',
    initialState: initialState,
    reducers,
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => {
            const newState = {...state}
            const { data } = {...action.payload}
            newState.user = {...data}
            newState.errors = {}
            return {...newState}
        },
        [userLogin.rejected]: (state, action) => {
            const newState = {...initialState}
            newState.errors = { password: "invalid username or password" }
            return {...newState}
        }
    },
    middleware: [...getDefaultMiddleware()],
  })