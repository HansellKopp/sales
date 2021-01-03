import { validate } from 'utils/utils'
import { TextField } from '@material-ui/core';
import { purchaseProductFormFields } from 'store/mockups/settings.json'
import Search from 'components/Search';

import { useStyles } from './style'

const AddProductForm = (props) => {
    const classes = useStyles();
    const { data, setData } = props

    const handleChange = (event) => {
        const target = event.target
        const newProduct = {...data.product, [target.name]: parseFloat(target.value) }
        const newErrors = validate(purchaseProductFormFields, {...newProduct})
        const newData = {product: {...newProduct}, errors: {...newErrors}}
        setData(newData)
    };

    const selectProduct = (value) => {   
        const newValues = {...data.product}
        Object.keys(purchaseProductFormFields).map(key => {
            if(value===null) {
                newValues[key] = ''
            } else if(value[key]) {
                newValues[key] = value[key]
            }
            return null
        })
        if(!value)  return
        const newProduct = {...newValues, 
            id: value ? value.id: '',
            quantity: 0, 
            description: value ? value.description: '',
            tax: value ? value.tax: 0
        }
        const newErrors = validate(purchaseProductFormFields, {...newProduct})
        setData({product: {...newProduct}, errors: {...newErrors}})
    }


    return (
        <div>
            <Search 
                url='/products' 
                field='description'
                fieldLabel='description'
                label='Buscar Productos'
                onChange={selectProduct}
            />
            <form className={classes.root} noValidate autoComplete="off">                
                {Object.keys(purchaseProductFormFields).map(key => {
                    const error = data.errors[key]
                    const helperText = error ? 
                        error :
                        purchaseProductFormFields[key].helperText
                    return (
                        <TextField
                            key={key}
                            name={key}
                            size='medium'
                            margin="normal"
                            value={data.product[key] || ''}
                            style={{ margin: 8 }}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            label={purchaseProductFormFields[key].label}
                            helperText={helperText || ''}
                            fullWidth={purchaseProductFormFields[key].fullWidth || false}
                            placeholder={purchaseProductFormFields[key].placeholder || ''}
                            error={error}
                        /> 
                    )
                }
                )}
            </form>            
        </div>
    )
}

export default AddProductForm