import { useSelector } from 'react-redux'
import GroupMenu from 'components/GroupMenu'
import ProductList from 'components/Products/ProductList'

const Products = () => {
    const products = useSelector(state => state.product.products)
    const selected = useSelector(state => state.state.selectedGroup)
    const filtered = products.filter(product=> product.departament === selected)
    console.log(products)
    return (
        <div className="w-full">
            <GroupMenu />
            <ProductList products={filtered} />
        </div>
    )
}

export default Products