import { v1 as uuidv1 } from 'uuid'

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
            newProducts=[...state.products, {
                ...action.payload, 
                quantity: 1,
                cart_id: uuidv1()
            }]
        }
        return {...state, products: newProducts}
    },

    addProductOffer: ( state, action ) => {
        const newProducts=[...state.products, {
            ...action.payload, 
            isOffer: true,
            id: action.payload.product_id,
            cart_id: uuidv1()
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

    clear: (state, action) => (initialState)

}

