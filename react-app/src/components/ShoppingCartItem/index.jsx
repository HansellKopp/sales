import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

const ShopppingCartItem = ({ product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const remove  = () => dispatch({ type: 'cart/removeProduct', payload: product })

    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={<span>{product.description}</span>} 
            />
            <div className="price" onClick={remove}>
                <div>{formatNumber(product.price)}<br />x {product.quantity}</div>
                <ListItemIcon ><RemoveIcon /></ListItemIcon>
            </div>
        </ListItem>
    )
}

export default  ShopppingCartItem