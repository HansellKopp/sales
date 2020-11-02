import { useDispatch } from 'react-redux'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SyncIcon from '@material-ui/icons/Sync';
import SendIcon from '@material-ui/icons/Send';

const ListItems = () => {
  const dispatch = useDispatch()
  const open = () => {
    dispatch({ type: 'state/toogleShowCart' })
    dispatch({ type: 'state/toogleOpenDrawer' })
  }
  const send = () => {
    dispatch({ type: 'state/toogleOpenDrawer' })
    dispatch({ type: 'state/showAlert', payload:
      { message: 'Envio del pedido realizado con exito'}
    })
    dispatch({ type: 'cart/clear' })
  }
  return (
  <div>
     <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Visualizar pedido" onClick={open}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Enviar pedido" onClick={send} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SyncIcon />
      </ListItemIcon>
      <ListItemText primary="Actualizar productos" />
    </ListItem>
  </div>
  )
}

export default ListItems