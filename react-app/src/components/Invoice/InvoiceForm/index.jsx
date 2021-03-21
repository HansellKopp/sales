import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { validate } from 'utils/utils'
import Search from 'components/Search';

import { useStyles } from './style'
import { invoiceFormFields } from 'store/mockups/settings.json'

const InvoiceForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { person } = useSelector(state => state.document.data)
    const { errors } = useSelector(state => state.document)

    const handleChange = (event) => {
        const target = event.target
        const newData = { ...person, [target.name]: target.value }
        const newErrors = validate(invoiceFormFields, {...newData})
        dispatch({ type: 'document/setPerson', payload:  newData })
        dispatch({ type: 'document/setErrors', payload:  newErrors })
    };

    const selectPerson = (data) => {
        const newValues = {...person}
        Object.keys(invoiceFormFields).map(key => {
            if(data===null) {
                newValues[key] = ''
            } else if(data[key]) {
                newValues[key] = data[key]
            }
            return null
        })
        dispatch({ type: 'document/setPerson', payload:  newValues })
    }

    return (
        <div>
            <Search 
                url='/persons' 
                field='firstname'
                label='Buscar Cliente'
                person_type='client'
                onChange={selectPerson}
            />
            <form className={classes.root} noValidate autoComplete="off">                
                {Object.keys(invoiceFormFields).map(key => {
                    const error = errors[key]
                    const helperText = error ? 
                        error :
                        invoiceFormFields[key].helperText
                    return (
                        <TextField
                            key={key}
                            name={key}
                            size='medium'
                            margin="normal"
                            value={person[key] || ''}
                            style={{ margin: 8 }}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            label={invoiceFormFields[key].label}
                            helperText={helperText || ''}
                            fullWidth={invoiceFormFields[key].fullWidth || false}
                            placeholder={invoiceFormFields[key].placeholder || ''}
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