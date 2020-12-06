import classnames from 'classnames'
import PropTypes from 'prop-types';
import { Edit, Delete, FilterList } from '@material-ui/icons'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'

import { useToolbarStyles } from './style'

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
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
  
        {numSelected > 0 ? (
            <>
          <Tooltip title="Eliminar">
            <IconButton aria-label="delete">
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton aria-label="delete">
              <Edit />
            </IconButton>
          </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  
export default EnhancedTableToolbar
