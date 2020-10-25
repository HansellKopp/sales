import React from 'react'
import { useSelector } from 'react-redux'
import OffersList from 'components/OffersList'

const Offers = () => {
    const offers = useSelector(state => state.state.offers)

    return (
        <OffersList offers={offers} />
    )
}

export default Offers