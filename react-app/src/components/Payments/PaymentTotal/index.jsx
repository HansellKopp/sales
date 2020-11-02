import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles} from './style'
import { formatNumber, totalize, cartTotal } from 'utils/utils'

const PaymentTotal = () => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart.products)
    const payments = useSelector(state => state.payment.payments)
    const total = cartTotal(cart)
    const totalAmount = totalize(payments, 'amount')
    const balance = total - totalAmount
    return (
        <>
        <ListItem className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={<><span>Total Pagos: </span></>} 
            />
            <>
            <div className="column"></div>
            <div className="column">
                <div className="total">{formatNumber(totalAmount)}</div>
            </div> 
            <div className="icon-column"></div> 
            </>
        </ListItem>
        <ListItem className={classes.root}>
            <ListItemText 
                className={classes.root}
                primary={<><span>Saldo: </span></>} 
            />
            <>
            <div className="column"></div>
            <div className="column">
                <div className="total">{formatNumber(balance)}</div>
            </div> 
            <div className="icon-column"></div> 
            </>
        </ListItem>
        </>
    )
}

export default PaymentTotal
