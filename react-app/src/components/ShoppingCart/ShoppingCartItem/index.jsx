import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from 'components/ShoppingCart/style'

const ShopppingCartItem = ({ product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const remove  = () => dispatch({ type: 'cart/removeProduct', payload: product })

    return (
        <ListItem className={classes.root}>
            <ListItemText 
                primary={<span>{product.description}</span>} 
            />
            <>
            <div className="column" onClick={remove}>
                <div>{formatNumber(product.quantity)}</div>
            </div>
            <div className="column" onClick={remove}>
                <div>{formatNumber(product.price)}</div>
                
            </div>
            <div className="icon-column">
                <ListItemIcon><RemoveIcon /></ListItemIcon>
            </div>
            </>
        </ListItem>
    )
}

export default  ShopppingCartItem