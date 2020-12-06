import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ListItem, ListItemIcon,ListItemText }  from '@material-ui/core'
import { ShoppingCart, Send, AccountCircle, Store } from '@material-ui/icons';

const ListItems = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const navigate = (url) => {
    history.push(url)
    dispatch({ type: 'state/toogleOpenDrawer' })
  }

  const open = () => {
    dispatch({ type: 'state/toogleShowCart' })
    navigate('/')
  }

  const send = () => {
    dispatch({ type: 'cart/clear' })
    navigate('/')
  }

  const login = () => navigate("/login")

  const products = () => navigate("/products")

  return (
  <div>
     <ListItem button>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Visualizar pedido" onClick={open}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      <ListItemText primary="Enviar pedido" onClick={send} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Store />
      </ListItemIcon>
      <ListItemText primary="Actualizar productos" onClick={products} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Login" onClick={login} />
    </ListItem>
  </div>
  )
}

export default ListItems