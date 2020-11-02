import { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './style'
import { invoiceFormFields } from 'store/mockups/settings.json'

const InvoiceForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({})

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                {Object.keys(invoiceFormFields).map((key, id) => 
                    <TextField
                        key={id}
                        size='medium'
                        margin="normal"
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        label={invoiceFormFields[key].label}
                        placeholder={invoiceFormFields[key].placeholder || ''}
                        helperText={invoiceFormFields[key].helperText || ''}
                        fullWidth={invoiceFormFields[key].fullWidth || false}
                    />
                )}
            </form>
        </div>
    )
}

export default InvoiceForm