export const initialState = {
    loading: 'idle', 
    errors: {},
    product: {},
    response: {}, 
    showErrors: false,
  }
  
export const reducers = {
  setProduct: ( state, action ) => {
    return {...state, product: action.payload}
  },
  setErrors: ( state, action ) => {
    return {...state, errors: action.payload}
  }
}