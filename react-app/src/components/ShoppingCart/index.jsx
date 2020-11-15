import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PaymentIcon from '@material-ui/icons/Payment';
import InvoiceIcon from '@material-ui/icons/Receipt';

import ShoppingCartItem from 'components/ShoppingCart/ShoppingCartItem'
import ShoppingCartHeader from 'components/ShoppingCart/ShoppingCartHeader'
import ShoppingCartTotal from 'components/ShoppingCart/ShoppingCartTotal';
import Payments from 'components/Payments/PaymentList'
import AddPayment from 'components/Payments/AddPayment'
import OpenInvoiceForm from 'components/Invoice/OpenInvoiceForm';

import { totalize, cartTotal } from 'utils/utils'

import { useStyles } from './style'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const ShoppingCart = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
   
    const cart = useSelector(state => state.cart.products)
    const payments = useSelector(state => state.payment.payments)
    const products = useSelector(state => state.cart.products)
    const total = cartTotal(cart)
    const totalAmount = totalize(payments, 'amount')
    const balance = total - totalAmount
    const toggleOpen = () => dispatch({ type: 'payment/toogleOpen' })

    const toggleOpenInvoice  = () => {
        if(balance <= 0) {
            dispatch({ type: 'state/toogleShowInvoiceForm' })
        } else {
            setOpenAlert(true)
        }
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="products-list">
                <ShoppingCartHeader />
                <Divider light />
                {products.map((product, key) => 
                    <ShoppingCartItem key={key} product={product} /> 
                )}
                <Divider light />
                <ShoppingCartTotal />
            </List>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<PaymentIcon />}
                onClick={toggleOpen}
            >Agregar pago</Button>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<InvoiceIcon />}
                onClick={toggleOpenInvoice}
            >Emitir Factura</Button>
            <AddPayment />
            <Payments />
            <OpenInvoiceForm />
            <Snackbar open={openAlert} autoHideDuration={6000} >
                <Alert severity="error" onClose={() => setOpenAlert(false)}>El monto de los pagos no es suficiente</Alert>
            </Snackbar>
      </div>)
}

export default ShoppingCart
