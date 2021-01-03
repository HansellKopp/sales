import { useSelector, useDispatch } from 'react-redux'
import { Paper, TextField, Typography }  from '@material-ui/core';
import { validate } from 'utils/utils'

import Search from 'components/Search';
import { purchaseFormFields } from 'store/mockups/settings.json'
import { useStyles } from './style'


const ProviderForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const purchase = useSelector(state => state.document.purchase)

    const handleChange = (event) => {
        const target = event.target
        const newData = { ...provider, [target.name]: target.value }
        const newErrors = validate(purchaseFormFields, {...newData})
        const newPurchase = {...purchase}
        newPurchase.errors = {...newErrors}
        newPurchase.provider = {...newData}
        dispatch({ type: 'document/setPurchase', payload:  newPurchase })
    };

    const selectProvider = (data) => {
        const newValues = {...provider}
        Object.keys(purchaseFormFields).map(key => {
            if(data===null) {
                newValues[key] = ''
            } else if(data[key]) {
                newValues[key] = data[key]
            }
            return null
        })
        const newPurchase = {...purchase}
        newPurchase.provider = {...newValues}
        dispatch({ type: 'document/setPurchase', payload:  newPurchase })
    }

    const { provider, errors } = purchase
    return (<Paper className={classes.root} elevation={2}  >
        <Typography variant="h5">Datos Proveedor</Typography>
        <Search 
            url='/persons' 
            field='firstname'
            label='Buscar Proveedor'
            onChange={selectProvider}
        />
        <form className={classes.root} noValidate autoComplete="off">                
            {Object.keys(purchaseFormFields).map(key => {
                const error = errors[key]
                const helperText = error ? 
                    error :
                    purchaseFormFields[key].helperText
                return (
                    <TextField
                        key={key}
                        name={key}
                        size='medium'
                        margin="normal"
                        value={provider[key] || ''}
                        style={{ margin: 8 }}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        label={purchaseFormFields[key].label}
                        helperText={helperText || ''}
                        fullWidth={purchaseFormFields[key].fullWidth || false}
                        placeholder={purchaseFormFields[key].placeholder || ''}
                        error={error}
                    /> 
                )
            }
            )}
        </form>
    </Paper>)
}

export default ProviderForm
