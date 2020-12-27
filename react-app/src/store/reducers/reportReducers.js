export const initialState = {
    loading: 'idle', 
    response: {}, 
    errors: {},
    showErrors: false,
    summary: {
      readyToPrint: false
    }
  }
  
export const reducers = {
    clear: (state, action) => (initialState)
}