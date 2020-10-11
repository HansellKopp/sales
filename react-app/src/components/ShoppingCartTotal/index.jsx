import React from 'react';
import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { formatNumber } from 'utils'
import { useStyles} from './style'

export default ( ) => {
    const classes = useStyles();
    const products = useSelector(state => state.cart.products)

    const total = products.reduce((acc, item) => item.price * item.quantity, 0)

    return (
        <ListItem className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={'Total pedido'} 
                secondary={<span className="quantity">{formatNumber(total)}</span>} 
            />
        </ListItem>
    )
}