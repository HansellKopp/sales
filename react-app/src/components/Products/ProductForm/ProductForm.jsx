import { useSelector, useDispatch } from 'react-redux'
import { validate } from 'utils/utils'
import { TextField } from '@material-ui/core';
import { productFormFields } from 'store/mockups/settings.json'

import { useStyles } from './style'

const InvoiceForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { 
        product,
        errors 
    } = useSelector(state => state.product)

    const handleChange = (event) => {
        const target = event.target
        const newData = { ...product, [target.name]: target.value }
        const newErrors = validate(productFormFields, {...newData})
        dispatch({ type: 'product/setProduct', payload:  newData })
        dispatch({ type: 'product/setErrors', payload:  newErrors })
    };

    if(!product) return null
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">                
                {Object.keys(productFormFields).map(key => {
                    const error = errors[key]
                    const helperText = error ? 
                        error :
                        productFormFields[key].helperText
                    return (
                        <TextField
                            key={key}
                            name={key}
                            size='medium'
                            margin="normal"
                            value={product[key] || ''}
                            style={{ margin: 8 }}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            label={productFormFields[key].label}
                            helperText={helperText || ''}
                            fullWidth={productFormFields[key].fullWidth || false}
                            placeholder={productFormFields[key].placeholder || ''}
                            error={error}
                        /> 
                    )
                }
                )}
            </form>            
        </div>
    )
}

export default InvoiceForm