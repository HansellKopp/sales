export const initialState = {
        products: [],
        show: false,
}

export const reducers = {
    
    addProduct: ( state, action ) => {
        let updated = false
        let newProducts = state.products.map(item => {
            if(item.id === action.payload.id) {
                updated = true
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        if(!updated) {
            newProducts=[...state.products, {...action.payload, quantity: 1 }]
        }
        return {...state, products: newProducts}
    },
    
    removeProduct: ( state, action ) => {
        const newProducts = state.products.map(item => {
            if(item.id === action.payload.id) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })

        return {...state, products: newProducts.filter(s=> s.quantity>0)}
    },

    clear: (state, action) => (initialState)

}

