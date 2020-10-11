export const cartItems = (cart) => {
    return cart.products.reduce((acc, product) => {
        return acc + product.quantity
    }, 0)
}
