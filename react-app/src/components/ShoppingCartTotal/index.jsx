import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';

import { useStyles} from './style'
import { formatNumber } from 'utils'
import { cartItems, cartKg, cartTotal } from 'utils/cart'

const ShoppingCartTotal = () => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart.products)
    const kg = cartKg(cart)
    const items = cartItems(cart)
    const total = cartTotal(cart)

    return (
        <>
        <ListItem className={classes.root}>
        <div className="total-row"> 
            <div className="cart-total">
                <div>Cantidad</div>
                <div className="amount">
                    <div className="total">{items}</div>
                </div>
            </div> 

            <div className="cart-total">
                <div>Peso Kg</div>
                <div className="amount">
                    <div className="total">{formatNumber(kg)}</div>
                </div>
            </div> 

            <div className="cart-total">
                <div>Monto</div>
                <div className="amount">
                    <div className="total">{formatNumber(total)}</div>
                </div>
            </div> 
        </div>
        </ListItem>
        
        </>
    )
}

export default ShoppingCartTotal