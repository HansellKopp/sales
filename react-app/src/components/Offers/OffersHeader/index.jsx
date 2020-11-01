
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles} from '../style'

const ProductListHeader = ({ product }) => {
    const classes = useStyles();
    return (
        <ListItem button className={classes.root}>
            <ListItemText 
                primary={ <div>
                    <span className="descripcion">Producto</span>
                </div>} 
            />
            <>
            <div className="column"><div>Peso</div></div>
            <div className="column"><div>Precio</div></div>
            <div className="icon-column"><div></div></div>
            </>
        </ListItem>
    )
}

export default ProductListHeader