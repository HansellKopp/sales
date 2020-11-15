import validateDocument from 'utils/validators'

export const initialState = {
    loading: 'idle', 
    response: {}, 
    errors: {},
    showErrors: false,
    data: {
      person: {}
    },
  }
  
export const reducers = {
    setPerson: ( state, action ) => {
      const newData={...state.data}
      newData.person = action.payload
      return {...state, data: newData}
    },

    setErrors: ( state, action ) => {
      return {...state, errors: {...action.payload}}
    },

    setShowErrors: ( state, action ) => {
      return {...state, showErrors: {...action.payload}}
    },

    save: ( state, action ) => {
      const { original, validated, errors } = validateDocument(action.payload)
    return { original, validated, errors }
  },

  clear: (state, action) => (initialState)

}