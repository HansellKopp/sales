import { useState } from 'react';
import uuid from 'uuid-random'
import TextField from '@material-ui/core/TextField';
import Search from 'components/Search';

import { useStyles } from './style'
import { invoiceFormFields } from 'store/mockups/settings.json'

const InvoiceForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({})

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const selectPerson = (data) => {
        const newValues = {...values}
        Object.keys(invoiceFormFields).map(key => {
            if(data===null) {
                newValues[key] = ''
            } else if(data[key]) {
                newValues[key] = data[key]
            }
            return null
        })
        setValues(newValues)
    }

    return (
        <div>
            <Search 
                url='/persons' 
                field='firstname'
                label='Buscar Cliente'
                onChange={selectPerson}
            />
            <form className={classes.root} noValidate autoComplete="off">                
                {Object.keys(invoiceFormFields).map(key => 
                    <TextField
                        key={uuid()}
                        size='medium'
                        margin="normal"
                        value={values[key]}
                        style={{ margin: 8 }}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        label={invoiceFormFields[key].label}
                        helperText={invoiceFormFields[key].helperText || ''}
                        fullWidth={invoiceFormFields[key].fullWidth || false}
                        placeholder={invoiceFormFields[key].placeholder || ''}
                    /> 
                )}
            </form>
        </div>
    )
}

export default InvoiceForm