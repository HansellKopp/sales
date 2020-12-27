import AddIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils/utils'
import { useStyles} from '../style'

const OfferItem = ({ offer }) => {
    const classes = useStyles();
	const dispatch = useDispatch()
    const handleClick = (offer) => {
        dispatch({ type: 'cart/addProduct', payload: offer })
    }
    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                primary={<span>{offer.description}</span>} 
            >
            </ListItemText>
            <>
            <div className="column" >
                <div>{offer.quantity} Kg</div>
            </div>
            <div className="column">
                <div>{formatNumber(offer.price)} $</div>
            </div>
            <div className="icon-column" onClick={(e) => handleClick(offer)}>
                <ListItemIcon><AddIcon /></ListItemIcon>
            </div>

            </>
        </ListItem>
    )
}

export default OfferItem