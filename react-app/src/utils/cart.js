export const cartItems = (items) => {
    if(!items) return 0
    return items.length
}

export const cartKg = (items) => {
    if(!items) return 0
    return items.reduce((acc, item) => {
        return acc + item.quantity
    }, 0)
}

export const cartTotal = (item) => {
    if(!item) return 0
    return item.reduce((acc, item) => {
        return acc + item.price
    }, 0)
}