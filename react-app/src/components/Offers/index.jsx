import React from 'react'
import { useSelector } from 'react-redux'
import ProductList from 'components/ProductList'

export default () => {
    const offers = useSelector(state => state.state.offers)

    return (
        <ProductList products={offers} />
    )
}