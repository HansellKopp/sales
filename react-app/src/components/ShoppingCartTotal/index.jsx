import React from 'react';
import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { formatNumber } from 'utils'
import { useStyles} from './style'

export default ( ) => {
    const classes = useStyles();
    const items = useSelector(state => state.cart.products)    
    let total = 0
    items.map(item => {
        if(item.isOffer) {
            total += item.price
        } else {
            total += item.price * item.quantity
        }
        return null
    })

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