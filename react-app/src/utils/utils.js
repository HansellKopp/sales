import validators from './validators'

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

export const validateDocument = (fields, data) => {
    let errors = null
    console.log(validators)
    errors = validate(fields.document, data)
    if(errors === null) {
        errors = validate(fields.person, data)
        if(errors === null) {
            errors = validate(fields.payments, data)
        }
    }
    return errors
}

export const validate = (fields, data) => {
    const errors = {}
    Object.keys(validators).forEach(key=> {
        Object.keys(fields).forEach(field => {
            const currentData = data[field]
            const fieldValidation = fields[field].validation
            if(fieldValidation) {                
                Object.keys(fieldValidation).forEach(current=> {
                    if(key === current) {
                        const validation = validators[key]
                        const result = validation.test(currentData)
                        if(!result) {
                            errors[field] = validators[key].message
                        }
                    }
                })
            }
        })
    })
    return errors
}