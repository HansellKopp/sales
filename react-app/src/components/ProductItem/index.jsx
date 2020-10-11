import React from 'react';
import AddIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

export default ( { product }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
	const onClick  = () => dispatch({ type: 'cart/addProduct', payload: product })

    return (
        <ListItem button onClick={onClick} className={classes.root}>
            <ListItemText 
                primary={product.description} 
                secondary={formatNumber(product.price)} 
            />
            <ListItemIcon style={{ minWidth: 'auto'}}>
                <AddIcon />
            </ListItemIcon>
        </ListItem>
    )
}