export const initialState = {
    loading: 'idle', 
    showOffers: false, 
    showProducts: false, 
    showCart: false,
    openDrawer: false,
    showSnackbar: false,
    showInvoiceForm: false,
    showProductForm: false,
    messages: []
  }
  
export const reducers = {
    toogleShowCart: (state) => {
    const newState = {...state}
    newState.showCart = !newState.showCart
    if(newState.showCart) {
      newState.showOffers = false
      newState.showProducts = false
    }
    return newState
  },

  toogleShowInvoiceForm: (state) => {
    const newState = {...state}
    newState.showInvoiceForm = !newState.showInvoiceForm
    return newState
  },

  toogleShowOffers: (state) => {
    const newState = {...state}
    newState.showOffers = !newState.showOffers
    if(newState.showOffers) {
      newState.showCart = false
      newState.showProducts = false
    }
    return newState
  },

  toogleShowProducts: (state) => {
    const newState = {...state}
    newState.showProducts = !newState.showProducts
    if(newState.showProducts) {
      newState.showCart = false
      newState.showOffers = false
    }
    return newState
  },

  toogleOpenDrawer: (state) => {
    const newState = {...state}
    newState.openDrawer = !newState.openDrawer
    return newState
  },

  toogleShowSnackBar: (state) => {
    const newState = {...state}
    newState.showSnackbar = !newState.showSnackbar
    return newState
  },

  toogleOpenInvoiceForm: (state) => {
    const newState = {...state}
    newState.openInvoiceForm = !newState.openInvoiceForm
    return newState
  },

  toogleOpenProductForm: (state) => {
    const newState = {...state}
    newState.showProductForm = !newState.showProductForm
    return newState
  },

  addMessage: (state, action) => {
    const newMessages = [...state.messages]
    newMessages.push(action.payload)
    return {state, messages: [...newMessages]}
  },

  removeMessage: (state, action) => {
    const newMessages = [...state.messages]
      .filter(s=> s.id!==action.payload.id )    
    return {state, messages: [...newMessages]}
  },

  showAlert: ( state, action ) => {
    const alert = {
      message: action.payload.message,
      severity: action.payload.severity || 'success'
    }
    return {...state, alert: {...alert}, showSnackbar: true }
  },

  selectGroup: ( state, action ) => {
    const newState = {...state}
    newState.selectedGroup = action.payload
    return newState
  },
}