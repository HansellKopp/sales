import { useSelector, useDispatch } from 'react-redux'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import RemoveIcon from '@material-ui/icons/RemoveCircle';

import { useStyles } from './style'
import { formatNumber, totalize } from 'utils/utils'

const Payments = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const payments = useSelector(state => state.payment.payments)
    const cart = useSelector(state => state.cart.products)

    const removePayment = (key) => dispatch({ type: 'payment/removePayment', payload: key })

    const total = totalize(cart)
    const totalAmount = totalize(payments, 'amount')
    const balance = total - totalAmount

    return(
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
                <TableCell align="left">Tipo</TableCell>
                <TableCell align="right">Monto $</TableCell>
                <TableCell align="right">Monto Bs.</TableCell>
                <TableCell align="left">Detalles</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {payments.map((payment,key ) => (
                <TableRow key={key}>
                <TableCell align="left">{payment.paymentType}</TableCell>
                <TableCell align="right">{formatNumber(payment.amount)}</TableCell>
                <TableCell align="right">{formatNumber(payment.amountBs)}</TableCell>
                <TableCell align="left">{payment.details}</TableCell>
                <TableCell align="left"><RemoveIcon onClick={() => removePayment(key)} /></TableCell>
                </TableRow>
            ))}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell align="right">Total Compra</TableCell>
                <TableCell align="right">{formatNumber(total)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">Total Pagos</TableCell>
                <TableCell align="right">{formatNumber(totalAmount)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">Saldo</TableCell>
                <TableCell align="right">{formatNumber(balance)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableFooter>
    </Table>
    </TableContainer>
    )
}

export default Payments