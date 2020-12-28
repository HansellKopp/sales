import { TableCell,TableRow, TableHead } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { useHeadStyles } from './style'

const EnhancedTableHead = ({ headCells, title }) => {
    const classes = useHeadStyles()
    return (
      <TableHead className={classes.root}>
        <TableRow>
          <TableCell component="th" colSpan={5}>
            <Typography variant="h6">    
            {title}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              colSpan={headCell.colSpan}
            >{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

export default EnhancedTableHead