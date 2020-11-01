import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PaymentIcon from '@material-ui/icons/Payment';
import Payments from 'components/InvoiceForm/Payments'
import AddPayment from 'components/InvoiceForm/AddPayment'

import { useStyles } from './style'
import { invoiceFormFields } from 'store/mockups/settings.json'

const InvoiceForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const toggleOpen = () => dispatch({ type: 'payment/toogleOpen' })

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                {Object.keys(invoiceFormFields).map((key, id) => 
                    <TextField
                        key={id}
                        size='normal'
                        margin="normal"
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        InputLabelProps={{ shrink: true }}
                        label={invoiceFormFields[key].label}
                        placeholder={invoiceFormFields[key].placeholder || ''}
                        helperText={invoiceFormFields[key].helperText || ''}
                        fullWidth={invoiceFormFields[key].fullWidth || false}
                    />
                )}
            </form>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<PaymentIcon />}
                onClick={toggleOpen}
            >Agregar pago</Button>
        <AddPayment />
        <Payments />
        </div>
    )
}

export default InvoiceForm