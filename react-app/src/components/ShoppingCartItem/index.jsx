import React from 'react';
// import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

const ProductText = (item) => {
    if(item.isOffer) return (
        <div>
            <span>{item.description}</span>
            <span> x {item.quantity} Kg</span>
        </div>)
    return( 
        <span>{item.description}</span>
    )
}

export default ( { product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const remove  = () => dispatch({ type: 'cart/removeProduct', payload: product })

    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={<ProductText {...product}/>} 
                secondary={formatNumber(product.price)} 
            />
            <div className="holder">
                <span className="quantity">{product.quantity}</span>
                <ListItemIcon style={{ minWidth: 'auto'}}>
                    <RemoveIcon onClick={remove} />
                </ListItemIcon>
            </div>
        </ListItem>
    )
}