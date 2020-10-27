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
import { useState } from 'react';

const paymentTypes = {
    'Efectivo $': { 'currency': '$'},
    'Zelle': { 'currency': '$'},
    'Panama': { 'currency': '$'},
    'Pago Mobil': { 'currency': 'Bs.'},
    'Transferencia': { 'currency': 'Bs'}
}

const AddPayment = ({open, handleClose}) => {
    const [values, setValues] = useState({paymentType: 'Efectivo $'})

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const classes = useStyles();
    return (

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir Pagos</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Por favor añada los datos del pago
            </DialogContentText>
            <FormControl className={classes.formControl}>
                <Select
                    value={values.paymentType}
                    onChange={handleChange('paymentType')}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {Object.keys(paymentTypes).map(key => 
                        <MenuItem value={key} key={key}>{key}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={values.amount}
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start">{paymentTypes[values.paymentType].currency}</InputAdornment>}
                />
            </FormControl>
            <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancelar</Button>
            <Button onClick={handleClose} color="primary">Agregar</Button>
        </DialogActions>
    </Dialog>
    )
}

export default AddPayment