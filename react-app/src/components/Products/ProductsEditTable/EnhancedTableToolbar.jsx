import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Delete, FilterList } from '@material-ui/icons'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'

import { useToolbarStyles } from './style'
import ConfirmActionDialog from 'components/ConfirmActionDialog/ConfirmActionDialog'

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const [open, setOpen] = React.useState(false)
  const { selected, deleteItem } = props
  const numSelected = selected.length

  const toogleConfirmOpen = () => setOpen(!open);

  return (
      <>
      <Toolbar
        className={classnames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} seleccionados
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Productos
          </Typography>
        )}
  
        {numSelected > 0 ? (<>
          <Tooltip title="Eliminar">
            <IconButton aria-label="delete" onClick={toogleConfirmOpen}>
              <Delete  />
            </IconButton>
          </Tooltip>
          </>) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <ConfirmActionDialog
        open={open}
        toogleOpen={toogleConfirmOpen}
        title="Por favor verifique"
        content={`Esta eliminando ${numSelected} producto(s), desea continuar ?`}
        onConfirm={deleteItem}
      />
      </>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  };
  
  
export default EnhancedTableToolbar