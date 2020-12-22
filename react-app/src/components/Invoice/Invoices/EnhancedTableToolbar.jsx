import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Print, FilterList } from '@material-ui/icons'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'

import { useToolbarStyles } from './style'

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { selected, imprimirItem } = props
  
  const numSelected = selected.length
  return (
      <>
      <Toolbar
        className={classnames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} seleccionada
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Factura
          </Typography>
        )}
  
        {numSelected === 1 && 
          <Tooltip title="Imprimir">
            <IconButton aria-label="imprimir" onClick={imprimirItem}>
              <Print  />
            </IconButton>
          </Tooltip>      
        }
        {numSelected === 0 && 
          <Tooltip title="Filtrar Items">
            <IconButton aria-label="filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        }
      </Toolbar>
      </>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  };
  
  
export default EnhancedTableToolbar
