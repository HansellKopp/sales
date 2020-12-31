import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Print, FilterList } from '@material-ui/icons'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'
import SelectRange from 'components/SelectRange/SelectRange'

import { formatDate } from 'utils/utils'
import { useToolbarStyles } from './style'

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const [open, setOpen] = React.useState(false)
  const dateformatoptions = { dateStyle: 'full' }
  const { selected, printItem, selectRange, range } = props
  const numSelected = selected.length

  const toogleRangeOpen = () => setOpen(!open)
  return (
      <>
      <Toolbar
        className={classnames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            Factura numero: {selected[0]} seleccionada
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Facturas
            {range.from === range.to ?
            <span> del dia: {formatDate(new Date(range.from),dateformatoptions)}</span>
            :<>
              <span> desde: {formatDate(new Date(range.from),dateformatoptions)}</span>
              <span> hasta: {formatDate(new Date(range.to),dateformatoptions)}</span>
            </>
            }
          </Typography>
        )}
  
        {numSelected === 1 && 
          <Tooltip title="Imprimir">
            <IconButton aria-label="imprimir" onClick={printItem}>
              <Print  />
            </IconButton>
          </Tooltip>      
        }
        {numSelected === 0 && 
          <Tooltip title="Filtrar Items">
            <IconButton aria-label="filter list" onClick={toogleRangeOpen}>
              <FilterList />
            </IconButton>
          </Tooltip>
        }
      </Toolbar>
      <SelectRange    
        open={open}
        range={range}
        toogleOpen={toogleRangeOpen}
        title="Por favor seleccione el rango de fechas"
        onConfirm={selectRange}
      />
      </>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  };
  
  
export default EnhancedTableToolbar
