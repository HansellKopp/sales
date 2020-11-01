export const totalize = (items, col) => 
    items ? 
    (items.reduce((acc, item) => {
        return acc + parseFloat(item[col])
    }, 0)) 
    : 0

export const formatNumber = (value) => 
    new Intl.NumberFormat('es-Es',{ minimumFractionDigits: 2 }).format(value)

export const cartItems = (items) => items ? items.length: 0

export const cartKg = (items) => totalize(items,'quantity')

export const cartTotal = (items) => totalize(items,'price')
