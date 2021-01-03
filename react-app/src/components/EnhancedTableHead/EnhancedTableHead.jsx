import PropTypes from 'prop-types';
import {
  TableCell,TableRow, TableHead, TableSortLabel
} from '@material-ui/core'
import { isFunction } from "utils/utils"

const EnhancedTableHead = (props) => {
    const { 
      order,
      classes,
      orderBy,
      headCells,
      onRequestSort,
      useCheck = true
    } = props;
    const createSortHandler = (property) => (event) => {
      if(onRequestSort === isFunction) {
        onRequestSort(event, property);
      }
    };
    return (
      <TableHead>
        <TableRow>
          {useCheck && <TableCell padding="checkbox" /> }
          {headCells.filter(s=> s.id).map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

export default EnhancedTableHead