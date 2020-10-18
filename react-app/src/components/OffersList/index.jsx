import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import OfferItem from 'components/OfferItem'

import { useStyles } from './style'

export default ({ offers }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Divider light />
            <List component="nav" aria-label="products-list">
                {offers.map((offer, key) => 
                    <OfferItem key={key} offer={offer} /> 
                )}
            </List>
      </div>)
}