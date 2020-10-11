import React from 'react';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

export default ( { product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const add  = () => dispatch({ type: 'cart/addProduct', payload: product })
    const remove  = () => dispatch({ type: 'cart/removeProduct', payload: product })

    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={product.description} 
                secondary={formatNumber(product.price)} 
            />
            <div className="holder">
                <ListItemIcon style={{ minWidth: 'auto'}}>
                    <AddIcon  onClick={add} />
                </ListItemIcon>
                <span className="quantity">{product.quantity}</span>
                <ListItemIcon style={{ minWidth: 'auto'}}>
                    <RemoveIcon onClick={remove} />
                </ListItemIcon>
            </div>
        </ListItem>
    )
}