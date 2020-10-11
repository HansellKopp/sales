export const initialState = {
    loading: 'idle', 
    showOffers: false, 
    showProducts: false, 
    showCart: false,
    openDrawer: false,
    showSnackbar: false,
    alert: {
        message: '',
        severity: 'success'
    }
  }
  
export const reducers = {

    toogleShowCart: (state) => {
    const cart = {...state}
    cart.showCart = !cart.showCart
    if(cart.showCart) {
      cart.showOffers = false
      cart.showProducts = false
    }
    return cart
  },

  toogleShowOffers: (state) => {
    const cart = {...state}
    cart.showOffers = !cart.showOffers
    if(cart.showOffers) {
      cart.showCart = false
      cart.showProducts = false
    }
    return cart
  },

  toogleShowProducts: (state) => {
    const cart = {...state}
    cart.showProducts = !cart.showProducts
    if(cart.showProducts) {
      cart.showCart = false
      cart.showOffers = false
    }
    return cart
  },

  toogleOpenDrawer: (state) => {
    const cart = {...state}
    cart.openDrawer = !cart.openDrawer
    return cart
  },

  toogleShowSnackBar: (state) => {
    const cart = {...state}
    cart.showSnackbar = !cart.showSnackbar
    return cart
  },

  showAlert: ( state, action ) => {
    const alert = {
      message: action.payload.message,
      severity: action.payload.severity || 'success'
    }
    return {...state, alert: {...alert}, showSnackbar: true }
  },

  selectGroup: ( state, action ) => {
    const cart = {...state}
    cart.selectedGroup = action.payload
    return cart
  },
}