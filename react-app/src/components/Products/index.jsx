import { useSelector } from 'react-redux'
import GroupMenu from 'components/GroupMenu'
import ProductList from 'components/Products/ProductList'

const Products = () => {
    const products = useSelector(state => state.product.products)
    let selected = useSelector(state => state.state.selectedGroup)
    if(!selected && products[0]) {
        selected = products[0].departament
    }
    const filtered = products.filter(product=> product.departament === selected)
    return (
        <div className="w-full">
            <GroupMenu />
            <ProductList products={filtered} />
        </div>
    )
}

export default Products