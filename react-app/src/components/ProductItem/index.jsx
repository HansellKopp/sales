
import AddIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

const ProductItem = ({ product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const handleClick = (product, price, quantity) => {
        const data = {...product, currentPrice: price, quantity }
        dispatch({ type: 'cart/addProduct', payload: data })
    }
    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                primary={ <div>
                    <span className="descripcion">{product.description}</span>                 
                </div>} 
            />
            <>
            <div className="price" onClick={(e) => handleClick(product, product.price, 1)}>
                <div>{formatNumber(product.price)}<br /> x 1</div>
                <ListItemIcon ><AddIcon /></ListItemIcon>
            </div>
            <div className="price" onClick={(e) => handleClick(product, product.price_2, 0.5)}>
                <div>{formatNumber(product.price_2)} x<br />0,5</div>
                <ListItemIcon><AddIcon /></ListItemIcon>
            </div>
            <div className="price" onClick={(e) => handleClick(product, product.price_3, 0.25)}>
                <div>{formatNumber(product.price_3)} x<br />0,25</div>
                <ListItemIcon><AddIcon /></ListItemIcon>
            </div>
            </>
        </ListItem>
    )
}

export default ProductItem