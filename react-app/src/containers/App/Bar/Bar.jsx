import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Typography } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { cartItems } from 'utils/utils'
import useStyles from './styles'

const Bar = () => {
    const history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.products)
    const { parameters, openDrawer } = useSelector(state => state.state)
    const toogleShowCart  = () => {
        history.push("/")
        dispatch({ type: 'state/toogleShowCart' })
    }
    const toogleShowExchange  = () => {
        dispatch({ type: 'state/toogleShowExchange' })
    } 
    const toogleOpenDrawer  = () => dispatch({ type: 'state/toogleOpenDrawer' })
    return (
        <AppBar position="absolute" className={classNames(classes.appBar, openDrawer && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toogleOpenDrawer}
                className={classNames(classes.menuButton, openDrawer && classes.menuButtonHidden)}
            ><MenuIcon /></IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                { parameters.name }
            </Typography>
            <IconButton color="inherit" onClick={toogleShowExchange}>
                <AttachMoneyIcon />
            </IconButton>
            <IconButton color="inherit" onClick={toogleShowCart}>
                <Badge badgeContent={cartItems(cart)} color="secondary">
                <ShoppingCartIcon />
                </Badge>
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Bar