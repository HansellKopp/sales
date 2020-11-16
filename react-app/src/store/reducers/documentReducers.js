export const initialState = {
    loading: 'idle', 
    response: {}, 
    errors: {},
    showErrors: false,
    data: {
      person: {},
      header: {},
      products: []
    },
  }
  
export const reducers = {
    setPerson: ( state, action ) => {
      const newData={...state.data}
      newData.person = action.payload
      return {...state, data: newData}
    },

    setHeader: ( state, action ) => {
      const newData={...state.data}
      newData.header = action.payload
      return {...state, data: newData}
    },

    setProducts: ( state, action ) => {
      const newData={...state.data}
      newData.products = action.payload
      return {...state, data: newData}
    },

    setErrors: ( state, action ) => {
      return {...state, errors: {...action.payload}}
    },

    setShowErrors: ( state, action ) => {
      return {...state, showErrors: {...action.payload}}
    },

    clear: (state, action) => (initialState)

}