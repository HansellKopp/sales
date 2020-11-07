import uuid from 'uuid-random'

export const initialState = {
        products: [],
        show: false,
}

export const reducers = {
    
    addProduct: ( state, action ) => {
        const newProducts=[...state.products, {
            ...action.payload, 
            cart_id: uuid()
        }]
        return {...state, products: newProducts}
    },

    addProductOffer: ( state, action ) => {
        const newProducts=[...state.products, {
            ...action.payload, 
            isOffer: true,
            id: action.payload.product_id,
            cart_id: uuid()
        }]
        return {...state, products: newProducts}
    },
    
    removeProduct: ( state, action ) => {
        const newProducts = state.products.map(item => {
            let removeQuantity = 1
            if(item.isOffer) {
                removeQuantity = action.payload.quantity
            }
            if(item.cart_id === action.payload.cart_id) {
                return {
                    ...item,
                    quantity: item.quantity - removeQuantity
                }
            }
            return item;
        })

        return {...state, products: newProducts.filter(s=> s.quantity>0)}
    },

    removeProductItem: ( state, action ) => {
        const newProducts = state.products.filter(item => (
            item['cart_id'] !== action.payload.cart_id
        ))
        return {...state, products: newProducts}
    },

    clear: (state, action) => (initialState)

}

