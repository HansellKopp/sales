import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import fields from './fields.json'
import { useStyles } from './style'

const initialState = [
    {'type': 'Efectivo $', 'amount': 10, 'details':''},
    {'type': 'Zelle', 'amount': 12, 'details':''},
    {'type': 'Panama', 'amount': 8, 'details':''},
    {'type': 'Pago Mobil','localAmount': 1200, 'amount': 18, 'details':'Tasa 437,850.00'},
    {'type': 'Transferencia','localAmount': 1800, 'amount': 14, 'details':'Tasa 437,850.00'},
]
const InvoiceForm = () => {
    const [payments, setPayments] = useState(initialState)
    const classes = useStyles();

    const handleRemovePayment = () => { setPayments([])}

    return (
        <>
        <form className={classes.root} noValidate autoComplete="off">
            {Object.keys(fields).map(key => 
                <TextField
                    key={key}
                    id="standard-full-width"
                    label={fields[key].label}
                    style={{ margin: 8 }}
                    placeholder={fields[key].placeholder || ''}
                    helperText={fields[key].helperText || ''}
                    fullWidth={fields[key].fullWidth || false}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                }}
                />              
            )}
        </form>
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Pagos</TableCell>
                        <TableCell align="right">Tipo</TableCell>
                        <TableCell align="right">Monto $</TableCell>
                        <TableCell align="right">Monto Bs.</TableCell>
                        <TableCell align="right">Detalles</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((row,payment,key ) => (
                        <TableRow key={key={key}}>
                        <TableCell component="th" scope="row">
                            {payment.type}
                        </TableCell>
                        <TableCell align="right">{payment.amount}</TableCell>
                        <TableCell align="right">{payment.localAmount}</TableCell>
                        <TableCell align="right">{payment.details}</TableCell>
                        <TableCell align="right"><RemoveIcon onClick={handleRemovePayment} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default InvoiceForm