import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ProductItem from 'components/Products/ProductItem'
import ProductListHeader from 'components/Products/ProductListHeader'

import { useStyles } from '../style'

const ProductList = ({ products }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="products-list">
                <ProductListHeader />
                <Divider light />
                {products.map((product, key) => 
                    <ProductItem key={key} product={product} /> 
                )}
            </List>
      </div>)
}

export default ProductList