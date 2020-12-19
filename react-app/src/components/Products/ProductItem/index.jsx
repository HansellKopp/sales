
import AddIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from '../style'

const ProductItem = ({ product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const handleClick = (product, price, quantity) => {
        const data = {...product, price, quantity }
        dispatch({ type: 'cart/addProduct', payload: data })
    }
    return (
        <ListItem button className={classes.list}>
            <ListItemText 
                primary={ <div>
                    <span className="descripcion">{product.description}</span>                 
                </div>} 
            />
            <>
            <div className="column" onClick={(e) => handleClick(product, product.price, 1)}>
                <div>{formatNumber(product.price)}<span> $ </span></div>
                <ListItemIcon ><AddIcon /></ListItemIcon>
            </div>
            <div className="column" onClick={(e) => handleClick(product, product.price_2, 0.5)}>
                <div>{formatNumber(product.price_2)}<span> $ </span></div>
                <ListItemIcon><AddIcon /></ListItemIcon>
            </div>
            <div className="column" onClick={(e) => handleClick(product, product.price_3, 0.25)}>
                <div>{formatNumber(product.price_3)}<span> $ </span></div>
                <ListItemIcon><AddIcon /></ListItemIcon>
            </div>
            </>
        </ListItem>
    )
}

export default ProductItem