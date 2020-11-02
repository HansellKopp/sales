export const initialState = {
        payments: [],
        open: false,
}

export const reducers = {
    
    addPayment: ( state, action ) => {
        const payments = [...state.payments, action.payload]
        return {...state, payments}
    },

  
    removePayment: ( state, action ) => {
        const key = action.payload
        const payments = state.payments
        const newPayments = 
            payments.slice(0, key).concat(payments.slice(key + 1, payments.length))

        return {...state, payments: newPayments}
    },

    toogleOpen: (state) => {
        const newState = {...state, open: !state.open}
        return {...newState}
      },
    

    clear: (state, action) => (initialState)

}

