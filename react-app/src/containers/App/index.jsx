import React from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import Copyright from 'components/Copyright'
import ExpandGroup from 'components/ExpandGroup'
import MainListItems from 'components/ListItems';

import { cartItems } from 'utils/utils'
import useStyles from './styles'
import SnackBarItem from 'components/SnackBarItem';

export default function Dashboard() {
  const classes = useStyles();
  const cart = useSelector(state => state.cart.products)
  const { parameters, loading, openDrawer } = useSelector(state => state.state)
  
  //const fixedHeightPaper = classNames(classes.paper, classes.fixedHeight);
  const dispatch = useDispatch()
  const toogleShowCart  = () => dispatch({ type: 'state/toogleShowCart' })
  const toogleOpenDrawer  = () => dispatch({ type: 'state/toogleOpenDrawer' })

  if (loading!=='idle') return ( null )
  return (
    <div className={classes.root}>
      <CssBaseline />
      <SnackBarItem />
      <AppBar position="absolute" className={classNames(classes.appBar, openDrawer && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toogleOpenDrawer}
            className={classNames(classes.menuButton, openDrawer && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            { parameters.name }
          </Typography>
          <IconButton color="inherit" onClick={toogleShowCart}>
            <Badge badgeContent={cartItems(cart)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        classes={{
          paper: classNames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toogleOpenDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems /></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ExpandGroup />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
