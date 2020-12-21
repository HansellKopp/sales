import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './style'

import { paymentTypes, defaultPayment } from 'store/mockups/settings.json'

const AddPayment = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [values, setValues] = useState(defaultPayment)

    const open = useSelector(state => state.payment.open)
    const { exchange } = useSelector(state => state.state.parameters)

    const toggleOpen = () => 
        dispatch({ type: 'payment/toogleOpen' })

    const addPayment = (data) => {
        let amount = 0
        let amountBs = 0
        if(paymentTypes[values.payment_type].currency === '$') {
            amount = values.amount
            amountBs = values.amount * exchange
        } else {
            amountBs = values.amount
            amount = values.amount / exchange
        }
        dispatch({ type: 'payment/addPayment', payload:  {...values, amount, exchange: exchange, amountBs}})
        toggleOpen()
    }

    useEffect(()=>{
        setValues(defaultPayment)
    }, [open])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
    <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir Pagos</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Por favor añada los datos del pago
            </DialogContentText>
            <FormControl className={classes.formControl}>
                <Select
                    value={values.payment_type || ''}
                    onChange={handleChange('payment_type')}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {Object.keys(paymentTypes).map(key => 
                        <MenuItem value={key} key={key}>{key}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={values.amount || ''}
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start">{paymentTypes[values.payment_type].currency}</InputAdornment>}
                />
            </FormControl>
            <TextField
                    id="name"
                    autoFocus
                    margin="dense"
                    value={values.details || ''}
                    onChange={handleChange('details')}
                    label={paymentTypes[values.payment_type].detailsLabel}
                    type={paymentTypes[values.payment_type].detailsType}
                    fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleOpen} color="secondary">Cancelar</Button>
            <Button onClick={addPayment} color="primary">Agregar</Button>
        </DialogActions>
    </Dialog>
    )
}

export default AddPayment