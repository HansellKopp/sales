import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles} from 'components/ShoppingCart/style'

const ShopppingCartItem = () => {
    const classes = useStyles();

    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                primary={<span>Productos</span>} 
            />
            <>
            <div className="column">
                <div>Kg</div>
            </div>
            <div className="column">
                <div>Precio<span> $</span></div>
            </div>
            <div className="icon-column"/>
            </>
        </ListItem>
    )
}

export default  ShopppingCartItem