import React from 'react'
import classnames from 'classnames'
import { Print, FilterList } from '@material-ui/icons'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'
import SelectDate from 'components/SelectDate/SelectDate'

import useToolbarStyles from 'styles/useToolbarStyles'

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const [open, setOpen] = React.useState(false)
  const { print, selectDate, date } = props

  const toogleDateOpen = () => setOpen(!open)
  return (
      <>
      <Toolbar
        className={classnames(classes.root)}
      >
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">          
          <span> Resumen diario</span>
        </Typography>
  
        <Tooltip title="Imprimir">
            <IconButton aria-label="imprimir" onClick={print}>
              <Print  />
            </IconButton>
        </Tooltip>      

        <Tooltip title="Seleccionar Fecha">
          <IconButton aria-label="filter list" onClick={toogleDateOpen}>
            <FilterList />
          </IconButton>
        </Tooltip>

      </Toolbar>
      <SelectDate    
        open={open}
        date={date}
        toogleOpen={toogleDateOpen}
        title="Por favor seleccione la fecha"
        onConfirm={selectDate}
      />
      </>
    );
  };
  

  
export default EnhancedTableToolbar
