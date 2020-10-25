import AddIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'
import { useStyles} from './style'

const OfferItem = ({ offer }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const handleClick = (offer) => {
        dispatch({ type: 'cart/addProduct', payload: offer })
    }
    return (
        <>
        <ListItem button className={classes.root}>
            <ListItemText 
                primary={<span className="descripcion">{offer.description}</span>} 
            >
            </ListItemText>
            <div className="price" onClick={(e) => handleClick(offer)}>
                <div>{formatNumber(offer.price)}<br />x {offer.quantity} Kg</div>
                <ListItemIcon ><AddIcon /></ListItemIcon>
            </div>
        </ListItem>
        </>
    )
}

export default OfferItem