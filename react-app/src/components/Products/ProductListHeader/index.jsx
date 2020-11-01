
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles} from '../style'

const ProductListHeader = ({ product }) => {
    const classes = useStyles();
    return (
        <ListItem button className={classes.list}>
            <ListItemText 
                primary={ <div>
                    <span className="descripcion">Producto</span>
                </div>} 
            />
            <>
            <div className="column"><div>1 Kg</div></div>
            <div className="column"><div>0,5 Kg</div></div>
            <div className="column"><div>0,25 Kg</div></div>
            </>
        </ListItem>
    )
}

export default ProductListHeader