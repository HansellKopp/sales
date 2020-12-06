export const initialState = {
    loading: 'idle', 
    response: {}, 
    errors: {},
    showErrors: false,    
    user: {},
  }
  
export const reducers = {
    setErrors: ( state, action ) => {
      return {...state, errors: {...action.payload}}
    },

    setShowErrors: ( state, action ) => {
      return {...state, showErrors: {...action.payload}}
    },

    clear: (state, action) => (initialState)

}