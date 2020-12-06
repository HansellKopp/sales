import { useSelector, useDispatch } from 'react-redux'
import { Accordion } from '@material-ui/core'
import { AccordionSummary } from '@material-ui/core'
import { AccordionDetails } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Offers from 'components/Offers'
import Products from 'components/Products'
// import Invoice from 'components/Invoice/Invoice';
import ShoppingCart from 'components/ShoppingCart';

import { useStyles } from './style'

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const {
    showCart,
    showOffers,
    showProducts,
  } = useSelector(state => state.state)
  const toogleShowCart  = () => dispatch({ type: 'state/toogleShowCart' })
  const toogleShowOffers  = () => dispatch({ type: 'state/toogleShowOffers' })
  const toogleShowProducts  = () => dispatch({ type: 'state/toogleShowProducts' })
  console.log('home')
  return (
    <div className={classes.root}>
      <Accordion expanded={showOffers} onChange={toogleShowOffers}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="offers-content"
          id="offers-header"
        >
          <Typography className={classes.heading}>Ofertas</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <Offers />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={showProducts} onChange={toogleShowProducts}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="products-content"
          id="products-header"
        >
          <Typography className={classes.heading}>Productos</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Products />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={showCart} onChange={toogleShowCart}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="order-content"
          id="order-header"
        >
          <Typography className={classes.heading}>Pedido</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ShoppingCart />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
