import React from 'react';
import { useSelector } from 'react-redux'

import GroupMenu from 'components/GroupMenu'
import ProductList from 'components/ProductList'

export default () => {
    const products = useSelector(state => state.state.products)
    const selected = useSelector(state => state.state.selectedGroup)
    const filtered = products.filter(product=> product.departament === selected)
    return (
        <div className="w-full">
            <GroupMenu />
            <ProductList products={filtered} />
        </div>
    )
}