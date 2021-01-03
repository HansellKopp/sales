import React from 'react'
import classnames from 'classnames'
import { AddCircleOutline } from '@material-ui/icons'
import { Toolbar, Tooltip, Typography, IconButton } from '@material-ui/core'
import AddProduct from './AddProduct'
import useToolbarStyles from 'styles/useToolbarStyles'

const PurchaseTableToolbar = () => {
  const classes = useToolbarStyles()
  const [open, setOpen] = React.useState(false)

  const addProduct = () => setOpen(true)

  return (
      <>
      <Toolbar
        className={classnames(classes.root, {
          [classes.highlight]: true,
        })}
      >
      <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            Productos
      </Typography>
      <Tooltip title="Agregar Producto">
        <IconButton aria-label="Add Productos" onClick={addProduct} className={classes.highlight}>
          <AddCircleOutline />
        </IconButton>
      </Tooltip>
      </Toolbar>
      <AddProduct open={open} setOpen={setOpen}/>
      </>
    );
  };
  

  
export default PurchaseTableToolbar
