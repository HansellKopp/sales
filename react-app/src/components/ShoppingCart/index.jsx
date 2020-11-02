import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ShoppingCartItem from 'components/ShoppingCart/ShoppingCartItem'
import ShoppingCartHeader from 'components/ShoppingCart/ShoppingCartHeader'
import ShoppingCartTotal from 'components/ShoppingCart/ShoppingCartTotal';
import Payments from 'components/Payments/PaymentList'
import PaymentIcon from '@material-ui/icons/Payment';
import InvoiceIcon from '@material-ui/icons/Receipt';
import AddPayment from 'components/Payments/AddPayment'
import OpenInvoiceForm from 'components/Invoice/OpenInvoiceForm';


import { useStyles } from './style'

const ShoppingCart = () => {
    const classes = useStyles();
    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const toggleOpen = () => dispatch({ type: 'payment/toogleOpen' })
    const toggleOpenInvoice  = () => dispatch({ type: 'state/toogleShowInvoiceForm' })

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
      </div>)
}

export default ShoppingCart