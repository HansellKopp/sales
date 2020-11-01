import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles} from './style'
import { formatNumber } from 'utils'
import { cartItems, cartKg, cartTotal } from 'utils/utils'

const ShoppingCartTotal = () => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart.products)
    const kg = cartKg(cart)
    const items = cartItems(cart)
    const total = cartTotal(cart)

    return (
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
    )
}

export default ShoppingCartTotal