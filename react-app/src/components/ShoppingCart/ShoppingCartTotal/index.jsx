import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentTotal from 'components/Payments/PaymentTotal';

import { useStyles} from './style'
import { cartItems, cartKg, cartTotal, formatNumber } from 'utils/utils'

const ShoppingCartTotal = () => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart.products)
    const kg = cartKg(cart)
    const items = cartItems(cart)
    const total = cartTotal(cart)

    return (<>
        <ListItem className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={<><span>Total Pedido: </span><span>({items})</span></>} 
            />
            <>
                <div className="column">
                    <div className="total">{formatNumber(kg)}</div>
                </div> 
                <div className="column">
                    <div className="total">{formatNumber(total)}</div>
                </div> 
                <div className="icon-column">
                </div> 

            </>
        </ListItem>
        <PaymentTotal />
    </>)
}

export default ShoppingCartTotal