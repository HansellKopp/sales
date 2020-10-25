import { useSelector } from 'react-redux'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ShoppingCartItem from 'components/ShoppingCartItem'

import { useStyles } from './style'
import ShoppingCartTotal from 'components/ShoppingCartTotal';

const ShoppingCart = () => {
    const classes = useStyles();
    const products = useSelector(state => state.cart.products)

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="products-list">
                {products.map((product, key) => 
                    <ShoppingCartItem key={key} product={product} /> 
                )}
                <Divider light />
                <ShoppingCartTotal />
            </List>
      </div>)
}

export default ShoppingCart