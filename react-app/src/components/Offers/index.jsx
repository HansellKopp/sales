
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import OfferItem from 'components/Offers/OfferItem'
import OffersHeader from 'components/Offers/OffersHeader'

import { useStyles } from './style'

const Offers = () => {
    const classes = useStyles();
    const offers = useSelector(state => state.state.offers)

    return (
        <div className={classes.root}>
            <Divider light />
            <OffersHeader />
            <List component="nav" aria-label="products-list">
                {offers.map((offer, key) => 
                    <OfferItem key={key} offer={offer} /> 
                )}
            </List>
      </div>
    )
}

export default Offers