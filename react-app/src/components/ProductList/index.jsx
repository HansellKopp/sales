import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ProductItem from 'components/ProductItem'

import { useStyles } from './style'

const ProductList = ({ products }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Divider light />
            <List component="nav" aria-label="products-list">
                {products.map((product, key) => 
                    <ProductItem key={key} product={product} /> 
                )}
            </List>
      </div>)
}

export default ProductList