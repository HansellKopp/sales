import validators from './validators'

export const totalize = (items, col) => 
    items ? 
    (items.reduce((acc, item) => {
        return acc + parseFloat(item[col])
    }, 0)) 
    : 0

export const totalizeCols = (items, cols) => 
    items ? 
    (items.reduce((acc, item) => {
        return acc + (parseFloat(item[cols[0]]) * parseFloat(item[cols[1]]))
    }, 0)) 
    : 0

export const formatNumber = (value) => 
    new Intl.NumberFormat('es-Es',{ minimumFractionDigits: 2 }).format(value)

export const formatDate = (value, options) => 
    new Intl.DateTimeFormat('en-Es', options ).format(value)

export const formatInvoiceNumber = value => leftZero(value, 6) 

export const leftZero = (value, size = 2) => {
    let num = value.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export const today = (value) => {
    const now = new Date()
    return `${now.getFullYear()}-${leftZero(now.getMonth()+1)}-${leftZero(now.getDate())}`
}

export const cartItems = (items) => items ? items.length: 0

export const cartKg = (items) => totalize(items,'quantity')

export const cartTotal = (items) => totalize(items,'price')

export const validateDocument = (fields, data) => {
    let errors = null
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

export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
export const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const isFunction = (functionToCheck) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}