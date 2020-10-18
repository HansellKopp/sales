import React from 'react';
import AddIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

const ProductText = (offer) => {
    return (
    <div>
        <span className="descripcion">{offer.description}</span>
        <span> x {offer.quantity} Kg</span>
    </div>)
}

export default ( { offer }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
	const onClick  = () => dispatch({ type: 'cart/addProductOffer', payload: offer })
    
    return (
        <>
        <ListItem button onClick={onClick} className={classes.root}>
            <ListItemText 
                primary={<ProductText {...offer} />} 
                secondary={formatNumber(offer.price)} 
            >
            </ListItemText>
            <ListItemIcon style={{ minWidth: 'auto'}}>
                <AddIcon />
            </ListItemIcon>
        </ListItem>
        </>
    )
}