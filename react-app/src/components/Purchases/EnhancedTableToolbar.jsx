import React from 'react'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Print, FilterList, AddCircleOutline } from '@material-ui/icons'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'
import SelectRange from 'components/SelectRange/SelectRange'

import { formatDate } from 'utils/utils'
import useToolbarStyles from 'styles/useToolbarStyles'


const EnhancedTableToolbar = (props) => {
  const history = useHistory()
  const classes = useToolbarStyles()
  const [open, setOpen] = React.useState(false)
  const dateformatoptions = { dateStyle: 'full' }
  const { selected, printItem, selectRange, range } = props
  const numSelected = selected.length

  const toogleRangeOpen = () => setOpen(!open)

  const goToNewPurchase = () => history.push('/purchases/new')

  return (
      <>
      <Toolbar
        className={classnames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            Compra numero: {selected[0]} seleccionada
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Compras
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
          <>
          <Tooltip title="Filtrar Items">
            <IconButton aria-label="filter list" onClick={toogleRangeOpen}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar Compra">
            <IconButton aria-label="Add purchase" onClick={goToNewPurchase}>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
          </>
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
