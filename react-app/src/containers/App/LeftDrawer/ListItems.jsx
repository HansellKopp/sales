import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ListItem, ListItemIcon,ListItemText }  from '@material-ui/core'
import { ShoppingCart, DeleteForever, AccountCircle, Store } from '@material-ui/icons';

const ListItems = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  
  const navigate = (url) => {
    history.push(url)
    dispatch({ type: 'state/toogleOpenDrawer' })
  }

  const open = () => {
    dispatch({ type: 'state/toogleShowCart' })
    navigate('/')
  }

  const clear = () => {
    dispatch({ type: 'cart/clear' })
    navigate('/')
  }

  const login = () => navigate("/login/")

  const logout = () => {
    dispatch({ type: 'auth/clear' })
    navigate('/')

  }
  
  const products = () => navigate("/products/")

  if(!user.active) {
    return (
    <div>
       <ListItem button>
        <ListItemIcon><ShoppingCart /></ListItemIcon>
        <ListItemText primary="Visualizar pedido" onClick={open}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon><DeleteForever /></ListItemIcon>
        <ListItemText primary="Limpiar pedido" onClick={clear} />
      </ListItem>
      <ListItem button>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Login" onClick={login} />
      </ListItem>
    </div>
    )
  }
  return (
    <div>
      <ListItem button>
        <ListItemIcon><DeleteForever /></ListItemIcon>
        <ListItemText primary="Limpiar pedido" onClick={clear} />
      </ListItem>
      <ListItem button>
        <ListItemIcon><Store /></ListItemIcon>
        <ListItemText primary="Actualizar productos" onClick={products} />
      </ListItem>
      <ListItem button>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Logout" onClick={logout} />
      </ListItem>
    </div>
    )

}

export default ListItems